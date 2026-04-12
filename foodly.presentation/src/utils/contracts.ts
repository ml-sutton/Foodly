function requireCond(cond: boolean, msg: string): void {
  if (!cond) {
    throw new Error(`[PRECONDITION FAILED] ${msg}`);
  }
}

function ensure(cond: boolean, msg: string): void {
  if (!cond) {
    throw new Error(`[POSTCONDITION FAILED] ${msg}`);
  }
}

function invariant(cond: boolean, msg: string): void {
  if (!cond) {
    throw new Error(`[INVARIANT FAILED] ${msg}`);
  }
}

export { requireCond, ensure, invariant };
