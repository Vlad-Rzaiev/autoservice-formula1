'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import { cn } from 'cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Button,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Label,
} from '@/components/ui';

const MAX_PHOTOS = 8;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

interface CarPhotosFieldProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  disabled?: boolean;
}

export function CarPhotosField({
  files,
  onFilesChange,
  disabled = false,
}: CarPhotosFieldProps) {
  const t = useTranslations('dashboard.cars.create.photos');
  const [selectionError, setSelectionError] = useState('');

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const selectedFiles = Array.from(input.files ?? []);

    input.value = '';

    if (selectedFiles.length === 0) return;

    if (files.length + selectedFiles.length > MAX_PHOTOS) {
      setSelectionError(t('too-many'));
      return;
    }

    if (selectedFiles.some((file) => !ALLOWED_TYPES.has(file.type))) {
      setSelectionError(t('invalid-type'));
      return;
    }

    if (selectedFiles.some((file) => file.size > MAX_FILE_SIZE)) {
      setSelectionError(t('too-large'));
      return;
    }

    setSelectionError('');
    onFilesChange([...files, ...selectedFiles]);
  }

  function removeFile(index: number) {
    onFilesChange(files.filter((_, fileIndex) => fileIndex !== index));
    setSelectionError('');
  }

  return (
    <Field>
      <FieldLabel htmlFor="carPhotos">{t('label')}</FieldLabel>
      <FieldDescription>{t('description')}</FieldDescription>

      <input
        id="carPhotos"
        name="carPhotos"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        disabled={disabled || files.length >= MAX_PHOTOS}
        onChange={handleFilesChange}
        className="peer sr-only"
      />

      <Label
        htmlFor="carPhotos"
        className={cn(
          'border-input bg-muted/30 hover:bg-accent hover:border-primary/50',
          'flex h-36 w-40! self-start flex-col items-center justify-center gap-3',
          'cursor-pointer rounded-md border-2 border-dashed p-4 text-center',
          'transition-colors',
          'peer-focus-visible:ring-ring peer-focus-visible:ring-2',
          (disabled || files.length >= MAX_PHOTOS) &&
            'pointer-events-none opacity-50',
        )}
      >
        <FontAwesomeIcon
          icon={faImage}
          aria-hidden="true"
          className="text-muted-foreground text-3xl"
        />

        <span className="text-sm font-medium">{t('chooseFiles')}</span>
      </Label>

      <FieldDescription>
        {t('count', { count: files.length, max: MAX_PHOTOS })}
      </FieldDescription>

      {selectionError && <FieldError>{selectionError}</FieldError>}

      {files.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((file, index) => (
            <CarPhotoPreview
              key={`${file.name}-${file.lastModified}-${index}`}
              file={file}
              disabled={disabled}
              removeLabel={t('remove')}
              onRemove={() => removeFile(index)}
            />
          ))}
        </div>
      )}
    </Field>
  );
}

interface CarPhotoPreviewProps {
  file: File;
  disabled: boolean;
  removeLabel: string;
  onRemove: () => void;
}

function CarPhotoPreview({
  file,
  disabled,
  removeLabel,
  onRemove,
}: CarPhotoPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewUrl(reader.result);
      }
    };

    reader.readAsDataURL(file);

    return () => {
      reader.abort();
    };
  }, [file]);

  return (
    <div className="min-w-0 space-y-2">
      <div className="bg-muted relative aspect-4/3 overflow-hidden rounded-md border">
        {previewUrl && (
          <Image
            src={previewUrl}
            alt={file.name}
            width={400}
            height={300}
            unoptimized
            className="size-full object-cover"
          />
        )}
      </div>

      <p className="truncate text-sm" title={file.name}>
        {file.name}
      </p>

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={onRemove}
      >
        <FontAwesomeIcon icon={faTrashCan} />
        {removeLabel}
      </Button>
    </div>
  );
}
