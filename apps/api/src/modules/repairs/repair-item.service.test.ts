import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Types } from 'mongoose';
import type {
  CreateRepairItemInput,
  RepairItemType,
  UserRole,
} from '@autoservice/contracts';
import { RepairCollection } from './repair.model.js';
import {
  RepairItemCollection,
  type RepairItemLeanDocument,
} from './repair-item.model.js';
import {
  createRepairItem,
  deleteRepairItem,
  getRepairItems,
  updateRepairItem,
} from './repair-item.service.js';
import { UserCollection } from '../user/user.model.js';

vi.mock('./repair.model.js', () => ({
  RepairCollection: {
    findById: vi.fn(),
    updateOne: vi.fn(),
  },
}));

vi.mock('./repair-item.model.js', () => ({
  RepairItemCollection: {
    find: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    aggregate: vi.fn(),
    deleteOne: vi.fn(),
  },
}));

vi.mock('../user/user.model.js', () => ({
  UserCollection: {
    findOne: vi.fn(),
  },
}));

type CurrentUser = {
  userId: string;
  role: UserRole;
};

type MockRepairItemDocument = RepairItemLeanDocument & {
  save: ReturnType<typeof vi.fn>;
  toObject: ReturnType<typeof vi.fn>;
};

const repairId = new Types.ObjectId();
const repairItemId = new Types.ObjectId();

const clientMongoId = new Types.ObjectId();
const mechanicMongoId = new Types.ObjectId();
const otherClientMongoId = new Types.ObjectId();

const clientUser: CurrentUser = {
  userId: '10000001',
  role: 'client',
};

const mechanicUser: CurrentUser = {
  userId: '10000002',
  role: 'mechanic',
};

const managerUser: CurrentUser = {
  userId: '10000003',
  role: 'manager',
};

const ownerUser: CurrentUser = {
  userId: '10000004',
  role: 'owner',
};

const createRepairDocument = (
  overrides: Partial<{
    clientId: Types.ObjectId;
    assignedMechanicId: Types.ObjectId;
    status: string;
  }> = {},
) => ({
  _id: repairId,
  clientId: clientMongoId,
  assignedMechanicId: mechanicMongoId,
  status: 'pending',
  ...overrides,
});

const createRepairItemDocument = (
  overrides: Partial<{
    _id: Types.ObjectId;
    repairId: Types.ObjectId;
    type: RepairItemType;
    name: string;
    description: string | null;
    quantity: number;
    unitPrice: number | null;
    totalPrice: number | null;
    source: 'client' | 'service';
    createdAt: Date;
    updatedAt: Date;
  }> = {},
): RepairItemLeanDocument => ({
  _id: repairItemId,
  repairId,
  type: 'part',
  name: 'Brake pads',
  description: 'Front brake pads',
  quantity: 2,
  unitPrice: null,
  totalPrice: null,
  source: 'client',
  createdAt: new Date('2026-01-01T10:00:00.000Z'),
  updatedAt: new Date('2026-01-01T10:00:00.000Z'),
  ...overrides,
});

const createMockRepairItemDocument = (
  overrides: Partial<{
    _id: Types.ObjectId;
    repairId: Types.ObjectId;
    type: RepairItemType;
    name: string;
    description: string | null;
    quantity: number;
    unitPrice: number | null;
    totalPrice: number | null;
    source: 'client' | 'service';
  }> = {},
): MockRepairItemDocument => {
  const repairItem = {
    ...createRepairItemDocument(overrides),
    save: vi.fn(),
    toObject: vi.fn(),
  } as MockRepairItemDocument;

  repairItem.save.mockResolvedValue(repairItem);
  repairItem.toObject.mockReturnValue(createRepairItemDocument(overrides));

  return repairItem;
};

const mockRepairFindById = (repair: unknown) => {
  vi.mocked(RepairCollection.findById).mockReturnValue({
    exec: vi.fn().mockResolvedValue(repair),
  } as never);
};

const mockRepairItemFindById = (repairItem: unknown) => {
  vi.mocked(RepairItemCollection.findById).mockReturnValue({
    exec: vi.fn().mockResolvedValue(repairItem),
  } as never);
};

const mockUserFindOne = (userId: Types.ObjectId) => {
  vi.mocked(UserCollection.findOne).mockReturnValue({
    select: vi.fn().mockReturnValue({
      lean: vi.fn().mockReturnValue({
        exec: vi.fn().mockResolvedValue({
          _id: userId,
          role: 'client',
        }),
      }),
    }),
  } as never);
};

const mockRepairItemFind = (repairItems: unknown[]) => {
  vi.mocked(RepairItemCollection.find).mockReturnValue({
    sort: vi.fn().mockReturnValue({
      lean: vi.fn().mockReturnValue({
        exec: vi.fn().mockResolvedValue(repairItems),
      }),
    }),
  } as never);
};

const mockAggregate = (total: number | null) => {
  vi.mocked(RepairItemCollection.aggregate).mockReturnValue({
    exec: vi.fn().mockResolvedValue(
      total === null
        ? []
        : [
            {
              total,
            },
          ],
    ),
  } as never);
};

const mockRepairUpdateOne = () => {
  vi.mocked(RepairCollection.updateOne).mockReturnValue({
    exec: vi.fn().mockResolvedValue({}),
  } as never);
};

const mockRepairItemCreate = (repairItem: unknown) => {
  vi.mocked(RepairItemCollection.create).mockResolvedValue(repairItem as never);
};

const mockRepairItemDelete = () => {
  vi.mocked(RepairItemCollection.deleteOne).mockReturnValue({
    exec: vi.fn().mockResolvedValue({
      deletedCount: 1,
    }),
  } as never);
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getRepairItems', () => {
  it('returns repair items for owner', async () => {
    mockRepairFindById(createRepairDocument());

    const repairItems = [
      createRepairItemDocument(),
      createRepairItemDocument({
        _id: new Types.ObjectId(),
        name: 'Oil filter',
      }),
    ];

    mockRepairItemFind(repairItems);

    await expect(
      getRepairItems(repairId.toString(), ownerUser),
    ).resolves.toEqual(repairItems);

    expect(RepairItemCollection.find).toHaveBeenCalledWith({
      repairId,
    });
  });

  it('returns repair items for manager', async () => {
    mockRepairFindById(createRepairDocument());

    const repairItems = [createRepairItemDocument()];

    mockRepairItemFind(repairItems);

    await expect(
      getRepairItems(repairId.toString(), managerUser),
    ).resolves.toEqual(repairItems);
  });

  it('returns repair items for the repair client', async () => {
    mockRepairFindById(
      createRepairDocument({
        clientId: clientMongoId,
      }),
    );

    mockUserFindOne(clientMongoId);

    const repairItems = [createRepairItemDocument()];

    mockRepairItemFind(repairItems);

    await expect(
      getRepairItems(repairId.toString(), clientUser),
    ).resolves.toEqual(repairItems);
  });

  it('returns repair items for the assigned mechanic', async () => {
    mockRepairFindById(
      createRepairDocument({
        assignedMechanicId: mechanicMongoId,
      }),
    );

    mockUserFindOne(mechanicMongoId);

    const repairItems = [createRepairItemDocument()];

    mockRepairItemFind(repairItems);

    await expect(
      getRepairItems(repairId.toString(), mechanicUser),
    ).resolves.toEqual(repairItems);
  });

  it('rejects access when repair does not exist', async () => {
    mockRepairFindById(null);

    await expect(
      getRepairItems(repairId.toString(), ownerUser),
    ).rejects.toMatchObject({
      status: 404,
    });

    expect(RepairItemCollection.find).not.toHaveBeenCalled();
  });

  it('rejects client who does not own the repair', async () => {
    mockRepairFindById(
      createRepairDocument({
        clientId: otherClientMongoId,
      }),
    );

    mockUserFindOne(clientMongoId);

    await expect(
      getRepairItems(repairId.toString(), clientUser),
    ).rejects.toMatchObject({
      status: 403,
    });

    expect(RepairItemCollection.find).not.toHaveBeenCalled();
  });

  it('rejects mechanic who is not assigned to the repair', async () => {
    mockRepairFindById(
      createRepairDocument({
        assignedMechanicId: new Types.ObjectId(),
      }),
    );

    mockUserFindOne(mechanicMongoId);

    await expect(
      getRepairItems(repairId.toString(), mechanicUser),
    ).rejects.toMatchObject({
      status: 403,
    });

    expect(RepairItemCollection.find).not.toHaveBeenCalled();
  });
});

describe('createRepairItem', () => {
  const createInput: CreateRepairItemInput = {
    type: 'part',
    name: 'Brake pads',
    description: null,
    quantity: 2,
  };

  it('allows client to create an item for a pending repair', async () => {
    mockRepairFindById(
      createRepairDocument({
        status: 'pending',
      }),
    );

    mockUserFindOne(clientMongoId);

    const createdRepairItem = createMockRepairItemDocument({
      source: 'client',
    });

    mockRepairItemCreate(createdRepairItem);

    const result = await createRepairItem(
      repairId.toString(),
      createInput,
      clientUser,
    );

    expect(RepairItemCollection.create).toHaveBeenCalledWith({
      repairId,
      type: 'part',
      name: 'Brake pads',
      description: null,
      quantity: 2,
      unitPrice: null,
      totalPrice: null,
      source: 'client',
    });

    expect(result).toEqual(
      createRepairItemDocument({
        source: 'client',
      }),
    );
  });

  it('rejects client when repair is not pending', async () => {
    mockRepairFindById(
      createRepairDocument({
        status: 'in_progress',
      }),
    );

    mockUserFindOne(clientMongoId);

    await expect(
      createRepairItem(repairId.toString(), createInput, clientUser),
    ).rejects.toMatchObject({
      status: 400,
    });

    expect(RepairItemCollection.create).not.toHaveBeenCalled();
  });

  it('allows mechanic to create a service item for an in-progress repair', async () => {
    mockRepairFindById(
      createRepairDocument({
        status: 'in_progress',
      }),
    );

    mockUserFindOne(mechanicMongoId);

    const createdRepairItem = createMockRepairItemDocument({
      source: 'service',
    });

    mockRepairItemCreate(createdRepairItem);

    await createRepairItem(repairId.toString(), createInput, mechanicUser);

    expect(RepairItemCollection.create).toHaveBeenCalledWith({
      repairId,
      type: 'part',
      name: 'Brake pads',
      description: null,
      quantity: 2,
      unitPrice: null,
      totalPrice: null,
      source: 'service',
    });
  });

  it('allows manager to create a service item for an in-progress repair', async () => {
    mockRepairFindById(
      createRepairDocument({
        status: 'in_progress',
      }),
    );

    const createdRepairItem = createMockRepairItemDocument({
      source: 'service',
    });

    mockRepairItemCreate(createdRepairItem);

    await createRepairItem(repairId.toString(), createInput, managerUser);

    expect(RepairItemCollection.create).toHaveBeenCalled();
  });

  it('allows owner to create a service item for an in-progress repair', async () => {
    mockRepairFindById(
      createRepairDocument({
        status: 'in_progress',
      }),
    );

    const createdRepairItem = createMockRepairItemDocument({
      source: 'service',
    });

    mockRepairItemCreate(createdRepairItem);

    await createRepairItem(repairId.toString(), createInput, ownerUser);

    expect(RepairItemCollection.create).toHaveBeenCalled();
  });

  it('rejects mechanic when repair is not in progress', async () => {
    mockRepairFindById(
      createRepairDocument({
        status: 'pending',
      }),
    );

    mockUserFindOne(mechanicMongoId);

    await expect(
      createRepairItem(repairId.toString(), createInput, mechanicUser),
    ).rejects.toMatchObject({
      status: 400,
    });

    expect(RepairItemCollection.create).not.toHaveBeenCalled();
  });

  it('rejects manager when repair is not in progress', async () => {
    mockRepairFindById(
      createRepairDocument({
        status: 'completed',
      }),
    );

    await expect(
      createRepairItem(repairId.toString(), createInput, managerUser),
    ).rejects.toMatchObject({
      status: 400,
    });

    expect(RepairItemCollection.create).not.toHaveBeenCalled();
  });

  it('returns 404 when repair does not exist', async () => {
    mockRepairFindById(null);

    await expect(
      createRepairItem(repairId.toString(), createInput, ownerUser),
    ).rejects.toMatchObject({
      status: 404,
    });

    expect(RepairItemCollection.create).not.toHaveBeenCalled();
  });
});

describe('updateRepairItem', () => {
  it('allows client to update own item in pending repair', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'client',
      quantity: 1,
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'pending',
        clientId: clientMongoId,
      }),
    );

    mockUserFindOne(clientMongoId);

    mockAggregate(null);
    mockRepairUpdateOne();

    await updateRepairItem(
      repairItemId.toString(),
      {
        quantity: 3,
        name: 'New brake pads',
      },
      clientUser,
    );

    expect(repairItem.quantity).toBe(3);
    expect(repairItem.name).toBe('New brake pads');
    expect(repairItem.unitPrice).toBeNull();
    expect(repairItem.totalPrice).toBeNull();
    expect(repairItem.save).toHaveBeenCalled();
  });

  it('rejects client update when repair is not pending', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'client',
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'in_progress',
        clientId: clientMongoId,
      }),
    );

    mockUserFindOne(clientMongoId);

    await expect(
      updateRepairItem(
        repairItemId.toString(),
        {
          quantity: 2,
        },
        clientUser,
      ),
    ).rejects.toMatchObject({
      status: 400,
    });

    expect(repairItem.save).not.toHaveBeenCalled();
  });

  it('rejects client update of service item', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'service',
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'pending',
        clientId: clientMongoId,
      }),
    );

    mockUserFindOne(clientMongoId);

    await expect(
      updateRepairItem(
        repairItemId.toString(),
        {
          name: 'Updated item',
        },
        clientUser,
      ),
    ).rejects.toMatchObject({
      status: 403,
    });

    expect(repairItem.save).not.toHaveBeenCalled();
  });

  it('rejects client price changes', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'client',
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'pending',
        clientId: clientMongoId,
      }),
    );

    mockUserFindOne(clientMongoId);

    await expect(
      updateRepairItem(
        repairItemId.toString(),
        {
          unitPrice: 100,
        },
        clientUser,
      ),
    ).rejects.toMatchObject({
      status: 403,
    });

    expect(repairItem.save).not.toHaveBeenCalled();
  });

  it('allows mechanic to update service item in progress', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'service',
      quantity: 2,
      unitPrice: 50,
      totalPrice: 100,
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'in_progress',
        assignedMechanicId: mechanicMongoId,
      }),
    );

    mockUserFindOne(mechanicMongoId);

    mockAggregate(150);
    mockRepairUpdateOne();

    await updateRepairItem(
      repairItemId.toString(),
      {
        quantity: 3,
        unitPrice: 50,
      },
      mechanicUser,
    );

    expect(repairItem.quantity).toBe(3);
    expect(repairItem.unitPrice).toBe(50);
    expect(repairItem.totalPrice).toBe(150);
    expect(repairItem.save).toHaveBeenCalled();

    expect(RepairCollection.updateOne).toHaveBeenCalledWith(
      { _id: repairId },
      {
        $set: {
          finalCost: 150,
        },
      },
    );
  });

  it('sets totalPrice to null when service item has no unit price', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'service',
      quantity: 2,
      unitPrice: null,
      totalPrice: 100,
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'in_progress',
        assignedMechanicId: mechanicMongoId,
      }),
    );

    mockUserFindOne(mechanicMongoId);

    mockAggregate(null);
    mockRepairUpdateOne();

    await updateRepairItem(
      repairItemId.toString(),
      {
        name: 'Updated part',
      },
      mechanicUser,
    );

    expect(repairItem.totalPrice).toBeNull();
  });

  it('always clears prices for client items', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'client',
      quantity: 2,
      unitPrice: 100,
      totalPrice: 200,
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'pending',
        clientId: clientMongoId,
      }),
    );

    mockUserFindOne(clientMongoId);

    mockAggregate(null);
    mockRepairUpdateOne();

    await updateRepairItem(
      repairItemId.toString(),
      {
        quantity: 5,
      },
      clientUser,
    );

    expect(repairItem.unitPrice).toBeNull();
    expect(repairItem.totalPrice).toBeNull();
  });

  it('rejects mechanic update when repair is not in progress', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'service',
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'pending',
        assignedMechanicId: mechanicMongoId,
      }),
    );

    mockUserFindOne(mechanicMongoId);

    await expect(
      updateRepairItem(
        repairItemId.toString(),
        {
          quantity: 2,
        },
        mechanicUser,
      ),
    ).rejects.toMatchObject({
      status: 400,
    });

    expect(repairItem.save).not.toHaveBeenCalled();
  });

  it('allows manager to update item in pending repair', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'service',
      quantity: 1,
      unitPrice: 50,
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'pending',
      }),
    );

    mockAggregate(50);
    mockRepairUpdateOne();

    await updateRepairItem(
      repairItemId.toString(),
      {
        unitPrice: 50,
      },
      managerUser,
    );

    expect(repairItem.totalPrice).toBe(50);
    expect(repairItem.save).toHaveBeenCalled();
  });

  it('allows owner to update item in progress repair', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'service',
      quantity: 1,
      unitPrice: 75,
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'in_progress',
      }),
    );

    mockAggregate(75);
    mockRepairUpdateOne();

    await updateRepairItem(
      repairItemId.toString(),
      {
        unitPrice: 75,
      },
      ownerUser,
    );

    expect(repairItem.totalPrice).toBe(75);
    expect(repairItem.save).toHaveBeenCalled();
  });

  it('rejects manager update for completed repair', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'service',
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'completed',
      }),
    );

    await expect(
      updateRepairItem(
        repairItemId.toString(),
        {
          name: 'Updated item',
        },
        managerUser,
      ),
    ).rejects.toMatchObject({
      status: 400,
    });

    expect(repairItem.save).not.toHaveBeenCalled();
  });

  it('returns 404 when repair item does not exist', async () => {
    mockRepairItemFindById(null);

    await expect(
      updateRepairItem(
        repairItemId.toString(),
        {
          quantity: 2,
        },
        mechanicUser,
      ),
    ).rejects.toMatchObject({
      status: 404,
    });
  });
});

describe('deleteRepairItem', () => {
  it('allows client to delete own client item from pending repair', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'client',
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'pending',
        clientId: clientMongoId,
      }),
    );

    mockUserFindOne(clientMongoId);

    mockRepairItemDelete();
    mockAggregate(null);
    mockRepairUpdateOne();

    await expect(
      deleteRepairItem(repairItemId.toString(), clientUser),
    ).resolves.toBeUndefined();

    expect(RepairItemCollection.deleteOne).toHaveBeenCalledWith({
      _id: repairItemId,
    });

    expect(RepairCollection.updateOne).toHaveBeenCalledWith(
      { _id: repairId },
      {
        $set: {
          finalCost: null,
        },
      },
    );
  });

  it('rejects client deletion from in-progress repair', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'client',
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'in_progress',
        clientId: clientMongoId,
      }),
    );

    mockUserFindOne(clientMongoId);

    await expect(
      deleteRepairItem(repairItemId.toString(), clientUser),
    ).rejects.toMatchObject({
      status: 400,
    });

    expect(RepairItemCollection.deleteOne).not.toHaveBeenCalled();
  });

  it('rejects client deletion of service item', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'service',
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'pending',
        clientId: clientMongoId,
      }),
    );

    mockUserFindOne(clientMongoId);

    await expect(
      deleteRepairItem(repairItemId.toString(), clientUser),
    ).rejects.toMatchObject({
      status: 403,
    });

    expect(RepairItemCollection.deleteOne).not.toHaveBeenCalled();
  });

  it('allows mechanic to delete service item from in-progress repair', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'service',
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'in_progress',
        assignedMechanicId: mechanicMongoId,
      }),
    );

    mockUserFindOne(mechanicMongoId);

    mockRepairItemDelete();
    mockAggregate(200);
    mockRepairUpdateOne();

    await deleteRepairItem(repairItemId.toString(), mechanicUser);

    expect(RepairItemCollection.deleteOne).toHaveBeenCalledWith({
      _id: repairItemId,
    });

    expect(RepairCollection.updateOne).toHaveBeenCalledWith(
      { _id: repairId },
      {
        $set: {
          finalCost: 200,
        },
      },
    );
  });

  it('rejects mechanic deletion from pending repair', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'service',
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'pending',
        assignedMechanicId: mechanicMongoId,
      }),
    );

    mockUserFindOne(mechanicMongoId);

    await expect(
      deleteRepairItem(repairItemId.toString(), mechanicUser),
    ).rejects.toMatchObject({
      status: 400,
    });

    expect(RepairItemCollection.deleteOne).not.toHaveBeenCalled();
  });

  it('allows manager to delete item from pending repair', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'service',
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'pending',
      }),
    );

    mockRepairItemDelete();
    mockAggregate(null);
    mockRepairUpdateOne();

    await expect(
      deleteRepairItem(repairItemId.toString(), managerUser),
    ).resolves.toBeUndefined();

    expect(RepairItemCollection.deleteOne).toHaveBeenCalled();
  });

  it('allows owner to delete item from in-progress repair', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'service',
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'in_progress',
      }),
    );

    mockRepairItemDelete();
    mockAggregate(300);
    mockRepairUpdateOne();

    await deleteRepairItem(repairItemId.toString(), ownerUser);

    expect(RepairItemCollection.deleteOne).toHaveBeenCalled();
  });

  it('rejects manager deletion from completed repair', async () => {
    const repairItem = createMockRepairItemDocument({
      source: 'service',
    });

    mockRepairItemFindById(repairItem);

    mockRepairFindById(
      createRepairDocument({
        status: 'completed',
      }),
    );

    await expect(
      deleteRepairItem(repairItemId.toString(), managerUser),
    ).rejects.toMatchObject({
      status: 400,
    });

    expect(RepairItemCollection.deleteOne).not.toHaveBeenCalled();
  });

  it('returns 404 when repair item does not exist', async () => {
    mockRepairItemFindById(null);

    await expect(
      deleteRepairItem(repairItemId.toString(), ownerUser),
    ).rejects.toMatchObject({
      status: 404,
    });
  });
});
