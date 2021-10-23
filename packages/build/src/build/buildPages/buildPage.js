/* eslint-disable no-param-reassign */

/*
  Copyright 2020-2021 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { type } from '@lowdefy/helpers';
import buildBlock from './buildBlock/buildBlock';

async function buildPage({ page, index, context }) {
  if (!type.isString(page.id)) {
    if (type.isUndefined(page.id)) {
      throw new Error(`Page id missing at page ${index}.`);
    }
    throw new Error(
      `Page id is not a string at at page ${index}. Received ${JSON.stringify(page.id)}.`
    );
  }
  page.pageId = page.id;
  const requests = [];
  const operators = new Set();
  await buildBlock(page, {
    auth: page.auth,
    getMeta: context.getMeta,
    operators,
    pageId: page.pageId,
    requests,
  });
  // set page.id since buildBlock sets id as well.
  page.id = `page:${page.pageId}`;

  page.requests = requests;
  page.operators = [...operators];
}

export default buildPage;