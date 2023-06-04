

export const getToken = (): string | null => {
    return localStorage.getItem('token');
  };
  
export const getUser = (): string | null => {
    return localStorage.getItem('user');
  };
  
  export const decodeToken = (token: string): any => {
    // Implement token decoding logic here
    // Return the decoded token payload (e.g., user object)
    // return jwt.decode(token)
  };