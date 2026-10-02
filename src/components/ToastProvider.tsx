'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { hideToast } from '@/store/slices/toastSlice';
import Toast from './Toast';

export default function ToastProvider() {
  const { message, type, isVisible } = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();

  return (
    <Toast
      message={message}
      type={type}
      isVisible={isVisible}
      onClose={() => dispatch(hideToast())}
    />
  );
}
