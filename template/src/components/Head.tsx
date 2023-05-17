import { Fragment, ComponentChildren } from 'preact';
import { createPortal } from 'preact/compat';

type Props = {
  children?: ComponentChildren;
};

export function Head({ children }: Props) {

  return createPortal(<>{children}</>, document.head);
}