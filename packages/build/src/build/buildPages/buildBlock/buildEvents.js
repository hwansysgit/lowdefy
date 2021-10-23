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

function buildEvents(block, pageContext) {
  if (block.events) {
    Object.keys(block.events).map((key) => {
      if (type.isArray(block.events[key])) {
        block.events[key] = {
          try: block.events[key],
          catch: [],
        };
      }
      if (!type.isArray(block.events[key].try)) {
        throw new Error(
          `Events must be an array of actions at "${block.blockId}" in event "${key}" on page "${
            pageContext.pageId
          }". Received ${JSON.stringify(block.events[key].try)}`
        );
      }
      if (!type.isArray(block.events[key].catch) && !type.isNone(block.events[key].catch)) {
        throw new Error(
          `Catch events must be an array of actions at "${
            block.blockId
          }" in event "${key}" on page "${pageContext.pageId}". Received ${JSON.stringify(
            block.events[key].catch
          )}`
        );
      }
    });
  }
}

export default buildEvents;