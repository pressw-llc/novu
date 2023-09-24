import { Types } from 'mongoose';
import {
  FilterParts,
  BuilderFieldType,
  BuilderGroupValues,
  IPreferenceChannels,
  IWorkflowStepMetadata,
  TemplateVariableTypeEnum,
  NotificationTemplateCustomData,
  TriggerContextTypeEnum,
  INotificationTemplate,
  INotificationTemplateStep,
  IStepVariant,
  INotificationTrigger,
  TriggerTypeEnum,
  IMessageFilter,
} from '@novu/shared';

import { MessageTemplateEntity } from '../message-template';
import { NotificationGroupEntity } from '../notification-group';
import type { OrganizationId } from '../organization';
import type { EnvironmentId } from '../environment';
import type { ChangePropsValueType } from '../../types';

export class NotificationTemplateEntity implements INotificationTemplate {
  _id: string;

  name: string;

  description: string;

  active: boolean;

  draft: boolean;

  preferenceSettings: IPreferenceChannels;

  critical: boolean;

  tags: string[];

  steps: NotificationStepEntity[];

  _organizationId: OrganizationId;

  _creatorId: string;

  _environmentId: EnvironmentId;

  triggers: NotificationTriggerEntity[];

  _notificationGroupId: string;

  _parentId?: string;

  deleted: boolean;

  deletedAt: string;

  deletedBy: string;

  createdAt?: string;

  updatedAt?: string;

  readonly notificationGroup?: NotificationGroupEntity;

  isBlueprint: boolean;

  blueprintId?: string;

  data?: NotificationTemplateCustomData;
}

export type NotificationTemplateDBModel = ChangePropsValueType<
  Omit<NotificationTemplateEntity, '_parentId'>,
  '_environmentId' | '_organizationId' | '_creatorId' | '_notificationGroupId'
> & {
  _parentId?: Types.ObjectId;
};

export class NotificationTriggerEntity implements INotificationTrigger {
  type: TriggerTypeEnum;

  identifier: string;

  variables: ITriggerVariable[];

  subscriberVariables?: Pick<ITriggerVariable, 'name'>[];

  reservedVariables?: ITriggerReservedVariable[];
}

export class StepVariantEntity implements IStepVariant {
  _id?: string;

  uuid?: string;

  name?: string;

  _templateId: string;

  active?: boolean;

  replyCallback?: {
    active: boolean;
    url: string;
  };

  template?: MessageTemplateEntity;

  filters?: StepFilter[];

  _parentId?: string | null;

  metadata?: IWorkflowStepMetadata;

  shouldStopOnFail?: boolean;
}

export class NotificationStepEntity extends StepVariantEntity implements INotificationTemplateStep {
  variants?: StepVariantEntity[];
}

export class StepFilter implements IMessageFilter {
  isNegated?: boolean;
  type?: BuilderFieldType;
  value: BuilderGroupValues;
  children: FilterParts[];
}

export interface ITriggerVariable {
  name: string;
  type: TemplateVariableTypeEnum;
}

export interface ITriggerReservedVariable {
  type: TriggerContextTypeEnum;
  variables: ITriggerVariable[];
}
