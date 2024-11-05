import { registerMessage } from "./chats";

export const roll = async (
  dices: { quant: number, faces: number, sum: number }[],
  advantage: boolean,
  disadvantage: boolean,
  sessionId: string,
  email: string,
  setShowMessage: any,
) => {
  console.log(advantage);
  console.log(disadvantage);
  const list = [];
  let sum = 0;
  const result = [];

  for (let i = 0; i < dices.length; i += 1) {
    sum += Number(dices[i].sum);
    for (let j = 0; j < dices[i].quant; j += 1) {
      list.push(dices[i].faces);
    }
  }

  for (let i = 0; i < list.length; i += 1) {
    result.push({ faces: list[i], result: Math.floor(Math.random() * list[i]) + 1 });
  }

  await registerMessage(sessionId, { rolls: { list: result, sum }, type: 'roll' }, email, setShowMessage);
};