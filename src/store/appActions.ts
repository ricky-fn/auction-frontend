export const setLoading = (isLoading:boolean) => ({
  type: 'SET_LOADING',
  payload: isLoading,
});

export const showToast = (toast) => ({
  type: 'SHOW_TOAST',
  payload: toast,
})


export const hideToast = () => ({
  type: 'HIDE_TOAST',
})