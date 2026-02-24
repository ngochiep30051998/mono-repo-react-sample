import React from 'react';
import clsx from 'clsx';
import { Cascader } from 'antd';
import type { CascaderProps } from 'antd';

const DEFAULT_CLASS = '!rounded-xl';

type CascaderOption = { value?: string; label?: React.ReactNode; children?: CascaderOption[] };

export default function AppCascader({
  className,
  ...rest
}: CascaderProps<CascaderOption>) {
  return <Cascader className={clsx(DEFAULT_CLASS, className)} {...(rest as React.ComponentProps<typeof Cascader>)} />;
}
