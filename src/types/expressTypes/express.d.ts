declare namespace Express {
  export interface Request {
    user?: import("../userRequest").userRequest;
  }
}
