/*
  Copyright 2020 Lowdefy, Inc

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

import React from 'react';
import { Switch } from 'antd';
import { blockDefaultProps } from '@lowdefy/block-tools';
import { type, serializer } from '@lowdefy/helpers';

import Label from '../Label/Label';
import Icon from '../Icon/Icon';

const SwitchBlock = ({ blockId, loading, methods, properties, required, validation, value }) => {
  let propertiesIconChecked = serializer.copy(properties.checkedIcon);
  if (type.isString(propertiesIconChecked)) {
    propertiesIconChecked = { name: propertiesIconChecked };
  }
  let propertiesIconUnchecked = serializer.copy(properties.uncheckedIcon);
  if (type.isString(propertiesIconUnchecked)) {
    propertiesIconUnchecked = { name: propertiesIconUnchecked };
  }
  return (
    <Label
      blockId={blockId}
      loading={loading}
      methods={methods}
      properties={{ title: properties.title, size: properties.size, ...properties.label }}
      required={required}
      validation={validation}
      content={{
        content: () => (
          <Switch
            autoFocus={properties.autoFocus}
            checked={!!value}
            className={methods.makeCssClass([
              properties.color && {
                '&.ant-switch-checked': { backgroundColor: `${properties.color} !important` },
              },
              properties.inputStyle,
            ])}
            disabled={properties.disabled}
            loading={loading}
            id={`${blockId}_input`}
            size={properties.size}
            checkedChildren={
              properties.checkedText ? (
                <span>{properties.checkedText}</span>
              ) : (
                <Icon
                  methods={methods}
                  properties={{
                    name: 'CheckOutlined',
                    ...(propertiesIconChecked || {}),
                  }}
                />
              )
            }
            unCheckedChildren={
              properties.uncheckedText ? (
                <span>{properties.uncheckedText}</span>
              ) : (
                <Icon
                  methods={methods}
                  properties={{
                    name: 'CloseOutlined',
                    ...(propertiesIconUnchecked || {}),
                  }}
                />
              )
            }
            onChange={(newVal) => {
              methods.setValue(newVal);
              methods.callAction({ action: 'onChange' });
            }}
          />
        ),
      }}
    />
  );
};

SwitchBlock.defaultProps = blockDefaultProps;

export default SwitchBlock;
