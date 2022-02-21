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

function createCachedPromises(getter) {
  const cache = new Map();

  function cachedPromises(key) {
    if (cache.has(key)) {
      return Promise.resolve(cache.get(key));
    }
    const promise = getter(key);
    cache.set(key, promise);
    return Promise.resolve(promise);
  }

  return cachedPromises;
}

export default createCachedPromises;