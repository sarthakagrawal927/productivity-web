import { MODAL_IDS } from '@/utils/constants';
import React, { ReactNode } from 'react';

const CustomModal = ({ children, modalId }: { children?: ReactNode, modalId: MODAL_IDS }) => {
  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CustomModal;