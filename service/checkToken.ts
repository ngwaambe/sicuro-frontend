import {authServiceCheckToken, clearToken} from "./authentication";
/**
 * check auth token against backend-service.
 * Tokens are cached for their ttl and check is performance against cache first.
 *
 * @param token access token to check
 */
export const checkToken = async (token: string): Promise<boolean> => {
  console.log("start token check .......")
  const response = await authServiceCheckToken(token);
  return response.active;
};
