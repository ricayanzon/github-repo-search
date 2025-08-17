import { createFragmentRegistry } from '@apollo/client/cache';
import { LANGUAGE_FRAGMENT } from './fragments/language';
import { LICENSE_FRAGMENT } from './fragments/license';
import { ORGANIZATION_FRAGMENT } from './fragments/organization';
import { OWNER_FRAGMENT } from './fragments/owner';
import { RELEASE_FRAGMENT } from './fragments/release';
import { REPOSITORY_FRAGMENT } from './fragments/repository';
import { USER_FRAGMENT } from './fragments/user';

export const fragmentRegistry = createFragmentRegistry();

fragmentRegistry.register(
  ...[
    LANGUAGE_FRAGMENT,
    LICENSE_FRAGMENT,
    ORGANIZATION_FRAGMENT,
    OWNER_FRAGMENT,
    RELEASE_FRAGMENT,
    REPOSITORY_FRAGMENT,
    USER_FRAGMENT,
  ],
);
