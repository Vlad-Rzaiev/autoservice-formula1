'use client';

import { useState, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import {
  bodyTypeSchema,
  createCarSchema,
  fuelTypeSchema,
  transmissionSchema,
  type CreateCarInput,
  type ClientDto,
} from '@autoservice/contracts';
import {
  Button,
  Input,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from '@/components/ui';
import { routes } from '@/config/routes';
import { useRouter } from '@/i18n/navigation';
import { useAuth } from '@/providers';
import { createCar } from '../api/create-car';
import { useClients } from '../../clients/api/use-clients';
import { Section, Container } from '@/components/layout';

const initialValues = {
  ownerId: '',
  brand: '',
  model: '',
  year: '',
  vin: '',
  licensePlate: '',
  mileage: '',
  generation: '',
  bodyType: '',
  fuelType: '',
  transmission: '',
  engine: '',
  color: '',
  registrationDate: '',
  countryOfRegistration: '',
  notes: '',
};

type FormValues = typeof initialValues;

export default function CreateCarForm() {
  const t = useTranslations('dashboard.cars.create');
  const locale = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, accessToken } = useAuth();

  const [values, setValues] = useState<FormValues>(initialValues);
  const [validationError, setValidationError] = useState('');

  const canChooseOwner = user?.role === 'owner' || user?.role === 'manager';

  const clientsQuery = useClients({ limit: 100 });

  const mutation = useMutation({
    mutationFn: (payload: CreateCarInput) => createCar(payload),

    onSuccess: async (car) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['dashboard'],
        }),
        queryClient.invalidateQueries({
          queryKey: ['cars'],
        }),
      ]);

      router.push(routes.dashboard.cars.detail(car._id));
    },
  });

  function updateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError('');

    const result = createCarSchema.safeParse({
      ...values,
      ownerId: canChooseOwner ? values.ownerId : user?._id,
      year: Number(values.year),
      licensePlate: values.licensePlate || null,
      mileage: values.mileage ? Number(values.mileage) : null,
      generation: values.generation || null,
      bodyType: values.bodyType || null,
      fuelType: values.fuelType || null,
      transmission: values.transmission || null,
      engine: values.engine || null,
      color: values.color || null,
      registrationDate: values.registrationDate
        ? new Date(`${values.registrationDate}T00:00:00.000Z`).toISOString()
        : null,
      countryOfRegistration: values.countryOfRegistration || null,
      notes: values.notes || null,
      photos: [],
    });

    if (!result.success) {
      setValidationError(result.error.issues[0]?.message ?? t('invalid-form'));
      return;
    }

    mutation.mutate(result.data);
  }

  if (!user || !accessToken) {
    return null;
  }

  return (
    <Section noTopPadding>
      <Container>
        <form className="space-y-8" onSubmit={handleSubmit}>
          {canChooseOwner && (
            <Field>
              <FieldLabel htmlFor="ownerId">{t('owner')}</FieldLabel>

              <select
                id="ownerId"
                name="ownerId"
                className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm"
                value={values.ownerId}
                onChange={(event) => updateField('ownerId', event.target.value)}
                required
                disabled={clientsQuery.isPending || clientsQuery.isError}
              >
                <option value="">{t('select-owner')}</option>

                {clientsQuery.data?.items.map((client: ClientDto) => (
                  <option key={client._id} value={client._id}>
                    {[client.firstName, client.lastName]
                      .filter(Boolean)
                      .join(' ') || client.email}
                    {' — '}
                    {client.email}
                  </option>
                ))}
              </select>

              {clientsQuery.isPending && (
                <FieldDescription>{t('loading-clients')}</FieldDescription>
              )}

              {clientsQuery.isError && (
                <FieldError>{t('clients-error')}</FieldError>
              )}

              {!clientsQuery.isPending &&
                !clientsQuery.isError &&
                clientsQuery.data?.items.length === 0 && (
                  <FieldDescription>{t('no-clients')}</FieldDescription>
                )}
            </Field>
          )}

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t('basic-info')}</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="brand">{t('brand')}</FieldLabel>
                <Input
                  id="brand"
                  name="brand"
                  value={values.brand}
                  onChange={(event) => updateField('brand', event.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="model">{t('model')}</FieldLabel>
                <Input
                  id="model"
                  name="model"
                  value={values.model}
                  onChange={(event) => updateField('model', event.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="year">{t('year')}</FieldLabel>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  min={1886}
                  max={new Date().getFullYear() + 1}
                  value={values.year}
                  onChange={(event) => updateField('year', event.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="vin">{t('vin')}</FieldLabel>
                <Input
                  id="vin"
                  name="vin"
                  value={values.vin}
                  maxLength={17}
                  onChange={(event) =>
                    updateField('vin', event.target.value.toUpperCase())
                  }
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="licensePlate">
                  {t('license-plate')}
                </FieldLabel>
                <Input
                  id="licensePlate"
                  name="licensePlate"
                  value={values.licensePlate}
                  onChange={(event) =>
                    updateField('licensePlate', event.target.value)
                  }
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="mileage">{t('mileage')}</FieldLabel>
                <Input
                  id="mileage"
                  name="mileage"
                  type="number"
                  min={0}
                  value={values.mileage}
                  onChange={(event) =>
                    updateField('mileage', event.target.value)
                  }
                />
              </Field>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">{t('specifications')}</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="generation">{t('generation')}</FieldLabel>
                <Input
                  id="generation"
                  name="generation"
                  value={values.generation}
                  onChange={(event) =>
                    updateField('generation', event.target.value)
                  }
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="engine">{t('engine')}</FieldLabel>
                <Input
                  id="engine"
                  name="engine"
                  value={values.engine}
                  onChange={(event) =>
                    updateField('engine', event.target.value)
                  }
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="color">{t('color')}</FieldLabel>
                <Input
                  id="color"
                  name="color"
                  value={values.color}
                  onChange={(event) => updateField('color', event.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="countryOfRegistration">
                  {t('country')}
                </FieldLabel>
                <Input
                  id="countryOfRegistration"
                  name="countryOfRegistration"
                  value={values.countryOfRegistration}
                  onChange={(event) =>
                    updateField('countryOfRegistration', event.target.value)
                  }
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="bodyType">{t('body-type')}</FieldLabel>
                <select
                  id="bodyType"
                  name="bodyType"
                  className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm"
                  value={values.bodyType}
                  onChange={(event) =>
                    updateField('bodyType', event.target.value)
                  }
                >
                  <option value="">{t('select-option')}</option>
                  {bodyTypeSchema.options.map((value) => (
                    <option key={value} value={value}>
                      {t(`body-types.${value}`)}
                    </option>
                  ))}
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="fuelType">{t('fuel-type')}</FieldLabel>
                <select
                  id="fuelType"
                  name="fuelType"
                  className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm"
                  value={values.fuelType}
                  onChange={(event) =>
                    updateField('fuelType', event.target.value)
                  }
                >
                  <option value="">{t('select-option')}</option>
                  {fuelTypeSchema.options.map((value) => (
                    <option key={value} value={value}>
                      {t(`fuel-types.${value}`)}
                    </option>
                  ))}
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="transmission">
                  {t('transmission')}
                </FieldLabel>
                <select
                  id="transmission"
                  name="transmission"
                  className="border-input bg-background h-10 w-full rounded-md border px-3 text-sm"
                  value={values.transmission}
                  onChange={(event) =>
                    updateField('transmission', event.target.value)
                  }
                >
                  <option value="">{t('select-option')}</option>
                  {transmissionSchema.options.map((value) => (
                    <option key={value} value={value}>
                      {t(`transmissions.${value}`)}
                    </option>
                  ))}
                </select>
              </Field>

              <Field>
                <FieldLabel htmlFor="registrationDate">
                  {t('registration-date')}
                </FieldLabel>
                <Input
                  id="registrationDate"
                  name="registrationDate"
                  type="date"
                  lang={locale}
                  value={values.registrationDate}
                  onChange={(event) =>
                    updateField('registrationDate', event.target.value)
                  }
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="notes">{t('notes')}</FieldLabel>
              <textarea
                id="notes"
                name="notes"
                className="border-input bg-background placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-24 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-[3px]"
                value={values.notes}
                onChange={(event) => updateField('notes', event.target.value)}
              />
            </Field>
          </div>

          {(validationError || mutation.isError) && (
            <FieldError>{validationError || t('submit-error')}</FieldError>
          )}

          <div className="flex flex-wrap gap-3">
            <Button
              type="submit"
              disabled={
                mutation.isPending ||
                (canChooseOwner &&
                  (clientsQuery.isPending || clientsQuery.isError))
              }
            >
              {mutation.isPending ? t('submitting') : t('submit')}
            </Button>

            <Button
              type="button"
              variant="outline"
              disabled={mutation.isPending}
              onClick={() => router.push(routes.dashboard.cars.list)}
            >
              {t('cancel')}
            </Button>
          </div>
        </form>
      </Container>
    </Section>
  );
}
