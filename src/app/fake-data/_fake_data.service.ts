import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ContractDb } from './contract';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            'contract': ContractDb.data
        };
    }
}

