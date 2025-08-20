import { createFragmentRegistry } from '@apollo/client/cache';
import { LanguageFragment } from './fragments/language';
import { LicenseFragment } from './fragments/license';
import { OrganizationFragment } from './fragments/organization';
import { OwnerFragment } from './fragments/owner';
import { RepositoryFragment } from './fragments/repository';
import { UserFragment } from './fragments/user';

export const fragmentRegistry = createFragmentRegistry();

fragmentRegistry.register(
  ...[
    LanguageFragment,
    LicenseFragment,
    OrganizationFragment,
    OwnerFragment,
    RepositoryFragment,
    UserFragment,
  ],
);
