export const login = (userId: string) => {
  return { type: 'LOGIN', payload: { userId } };
};

export const logout = () => {
  return { type: 'LOGOUT' };
};

export const deposit = (amount: number) => {
  return { type: 'DEPOSIT', payload: { amount } };
};