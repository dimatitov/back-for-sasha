import { Request, Response } from "express";

import { IChatController } from "./chatController.interfaces";
import { $messages, IUser, setMessage } from "../../store";
import { ResponseStatusMessage } from "../../constants/controller";

class ChatController implements IChatController {
  public setMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, message } = req.body;
      const user: IUser = {
        name,
        message,
      };

      if (!user.message) {
        res.status(400).json(ResponseStatusMessage.NOT_MESSAGE);
      }
      if (!user.name) {
        res.status(400).json(ResponseStatusMessage.NOT_NAME);
      }
      setMessage(user);
      res.status(200).json(ResponseStatusMessage.SUCCESS);
    } catch (e) {
      res.status(400).json(ResponseStatusMessage.ERROR);
    }
  };
  public getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const messages = $messages.getState();
      res
        .status(200)
        .json({ message: ResponseStatusMessage.SUCCESS, response: messages });
    } catch (e) {
      res.status(400).json(ResponseStatusMessage.ERROR);
    }
  };
}

export const chatController = new ChatController();
