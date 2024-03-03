import { forwardRef, useImperativeHandle, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

interface ModalProps {
  children: ReactNode;
  buttonCaption: string;
  onClose: Function;
  likes?: number;
  downloads?: number;
  views?: number;
}

export interface ModalHandles {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalHandles, ModalProps>(
  ({ children, buttonCaption, onClose, likes, downloads, views }, ref) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => dialog.current?.showModal(),
      close: () => dialog.current?.close(),
    }));

    const handleCloseClick = () => {
      dialog.current?.close();
      onClose();
    };

    return createPortal(
      <dialog
        ref={dialog}
        className="backdrop:bg-stone-900/70 p-4 rounded-md shadow-md"
      >
        {children}
        <form method="dialog" className="mt-4 text-right">
          <div className="flex justify-between items-center mt-4 p-4 bg-white rounded-b-md">
            <div>
              {likes && (
                <span className="font-semibold mr-4">Likes: {likes}</span>
              )}
              {downloads && (
                <span className="font-semibold mr-4">
                  Downloads: {downloads}
                </span>
              )}
              {views && (
                <span className="font-semibold mr-4">Views: {views}</span>
              )}
            </div>
            <Button type="button" onClick={handleCloseClick}>
              {buttonCaption}
            </Button>
          </div>
        </form>
      </dialog>,
      document.getElementById("modal-root") as HTMLElement
    );
  }
);

export default Modal;
