/**
 * Type representing the structure of a console output.
 */
type TConsoleOutput = {
  /**
   * **Type** of the console ouptut which is endicate out your console output type
   * For Example `type` will be like (**log | warn | network**) etc
   */
  type: string;
  /**
   * **Message** is your output of data which is captured
   * Meessage type will be anything, we are not sure about our console oputput type or anything else that's why it's any | unknown
   */
  message: any;
  /**
   * **Where** is looks like a location os the oputout from the where we getten that ouptut
   * Which is optional
   */
  where?: string;
};
