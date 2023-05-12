import type { Document } from 'bson';

import type { Collection } from '../../collection';
import type { Server } from '../../sdam/server';
import type { ClientSession } from '../../sessions';
import type { Callback } from '../../utils';
import { AbstractOperation } from '../operation';

export class UpdateSearchIndexOperation extends AbstractOperation<void> {
  constructor(
    private collection: Collection<any>,
    private name: string,
    private definition: Document,
    override options: Document
  ) {
    super(options);
  }

  execute(server: Server, session: ClientSession | undefined, callback: Callback<void>): void {
    const namespace = this.collection.mongoDBNamespace;
    const command = {
      updateSearchIndex: namespace.collection,
      name: this.name,
      definition: this.definition
    };

    server.command(namespace, command, { session }, err => {
      if (err) {
        callback(err);
        return;
      }

      callback();
    });
  }
}
