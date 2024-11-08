import { useContext, useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import contexto from "../../../context/context";
import { updateDataPlayer } from "../../../firebase/players";

export default function EditHealthPoints() {
  const [dataPlayer, setDataPlayer] = useState<any>(null);
  const [type, setType] = useState('');
  const [typeOfDamage, setTypeOfDamage] = useState('');
  const [value, setValue] = useState(0);
  const [temporaryHeal, setTemporaryHeal] = useState(false);
  const [magicDamage, setMagicDamage] = useState(false);

  const { session, showSheet, players, setEditHealthPoints, setShowMessage } = useContext(contexto);

  useEffect(() => {
    const findPlayer = players.find((player: any) => player.id === showSheet.id);
    setDataPlayer(findPlayer);
  }, [session, players]);

  return(
    <div className="z-50 absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/80 px-3 sm:px-0 text-white">
      <div className="w-full sm:w-2/3 md:w-1/2 overflow-y-auto flex flex-col justify-center items-center relative bg-gray-whats-dark border-white border-2 p-4">
        <div className="pt-4 sm:pt-2 w-full flex justify-end">
          <IoIosCloseCircleOutline
            className="text-4xl text-white cursor-pointer"
            onClick={ () => setEditHealthPoints(false) }
          />
        </div>
        <div className="capitalize w-full">
          <span className="pr-3 mb-3"></span>
          <div className="flex items-center gap-2">
            <div className="box-select flex items-center justify-center w-full col-span-1 mt-2">
              <div className="box__line box__line--top" />
              <div className="box__line box__line--right" />
              <div className="box__line box__line--bottom" />
              <div className="box__line box__line--left" />
              <select
                className="w-full text-center py-1 bg-gray-whats-dark cursor-pointer outline-none"
                value={type}
                onChange={ (e) => setType(e.target.value) }
              >
                <option disabled value="">Selecione</option>
                <option value="damage">Dano</option>
                <option value="heal">Cura</option>
              </select>
            </div>
          </div>
        </div>
        {
          type === 'heal' &&
          <div className="w-full">
            { 
              dataPlayer.sheet.hitPoints.actual > 0 &&
              <button
                type="button"
                onClick={ () => setTemporaryHeal(!temporaryHeal) }
                className={`relative flex items-center justify-center w-full col-span-1 py-1 mt-5 ${temporaryHeal && 'bg-white text-black font-bold'}`}
              >
                <div className="box__line box__line--top"></div>
                <div className="box__line box__line--right"></div>
                <div className="box__line box__line--bottom"></div>
                <div className="box__line box__line--left"></div>
                <div className="flex w-full justify-center text-center">
                  Marque se está ganhando pontos de Vida Temporários
                </div>
              </button>
            }
            <button
              type="button"
              className="w-full mt-5 cursor-pointer hover:bg-white hover:text-black transition-colors duration-400"
              onClick={ async () => {
                dataPlayer.sheet.hitPoints.actual = dataPlayer.sheet.hitPoints.total;
                await updateDataPlayer(session.id, dataPlayer, setShowMessage);
                setType('');
                setValue(0);
                setEditHealthPoints(false);
              }}
            >
              <div className="relative flex items-center justify-center w-full col-span-1 py-1">
                <div className="box__line box__line--top"></div>
                <div className="box__line box__line--right"></div>
                <div className="box__line box__line--bottom"></div>
                <div className="box__line box__line--left"></div>
                <div>Preencher todos os Pontos de Vida</div>
              </div>
            </button>
          </div>
        }
        {
          type === 'damage' &&
          <div className="w-full mt-3">
            <div className="flex items-center gap-2">
              <div className="box-select flex items-center justify-center w-full col-span-1 mt-2">
                <div className="box__line box__line--top" />
                <div className="box__line box__line--right" />
                <div className="box__line box__line--bottom" />
                <div className="box__line box__line--left" />
                <select
                  className="w-full text-center py-1 bg-gray-whats-dark cursor-pointer outline-none"
                  value={typeOfDamage}
                  onChange={ (e) => setTypeOfDamage(e.target.value) }
                >
                  <option disabled value="">Informe o Tipo de Dano</option>
                  <option 
                    title="A baforada corrosiva de um dragão negro e as enzimas dissolventes secretadas por um pudim negro causam dano ácido."
                    value="Ácido"
                  >
                    Ácido
                  </option>
                  <option 
                    title="Ataque brusco de força - martelos, queda, constrição e coisas do tipo - causam dano de concussão."
                    value="Contundente"
                  >
                    Contundente
                  </option>
                  <option 
                    title="Espadas, machados e garras de monstros causam dano cortante."
                    value="Contundente"
                  >
                    Cortante
                  </option>
                  <option 
                    title="A magia relâmpago e a baforada de um dragão azul causam dano elétrico."
                    value="Elétrico"
                  >
                    Elétrico
                  </option>
                  <option 
                    title="É energia mágica pura focada em causar dano. A maioria dos efeitos que causa dano de energia são magias, incluindo mísseis mágicos e arma espiritual."
                    value="Energético"
                  >
                    Energético
                  </option>
                  <option 
                    title="O frio infernal da lança do diabo do gelo e a explosão frígida da baforada de um dragão branco causam dano de frio."
                    value="Congelante"
                  >
                    Congelante
                  </option>
                  <option 
                    title="Dragões vermelhos sopram fogo e muitas magias conjuram chamas para causar dano de fogo."
                    value="Flamejante"
                  >
                    Flamejante
                  </option>
                  <option 
                    title="Dano necrótico, causado por mortos-vivos e magias como toque arrepiante, seca a matéria e até mesmo a alma."
                    value="Necrótico"
                  >
                    Necrótico
                  </option>
                  <option 
                    title="Ataques de perfuração e empalação, incluindo lanças e mordidas de monstros, causam dano perfurante."
                    value="Perfurante"
                  >
                    Perfurante
                  </option>
                  <option 
                    title="Habilidades mentais como a rajada psiônica de um devorador de mentes causam dano psíquico."
                    value="Psíquico"
                  >
                    Psíquico
                  </option>
                  <option 
                    title="Dano radiante, causado pela magia de clérigo coluna de chamas ou a arma empunhada por um anjo, cauteriza a carne como fogo e sobrecarrega o espírito com poder."
                    value="Radiante"
                  >
                    Radiante
                  </option>
                  <option 
                    title="O estouro e concussão do som, como os efeitos da magia onda trovejante, causam dano trovejante."
                    value="Trovejante"
                  >
                    Trovejante
                  </option>
                  <option 
                    title="Ferrões venenosos e gases tóxicos da baforada de um dragão verde causam dano de veneno."
                    value="Venenoso"
                  >
                    Venenoso
                  </option>
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={ () => setMagicDamage(!magicDamage) }
              className={`relative flex items-center justify-center w-full col-span-1 py-1 mt-5 ${magicDamage && 'bg-white text-black font-bold'}`}
            >
              <div className="box__line box__line--top"></div>
              <div className="box__line box__line--right"></div>
              <div className="box__line box__line--bottom"></div>
              <div className="box__line box__line--left"></div>
              <div className="flex w-full justify-center text-center">
                Marque se o Dano É Mágico
              </div>
            </button>
            <button
              type="button"
              className="w-full mt-5 cursor-pointer hover:bg-white hover:text-black transition-colors duration-400"
              onClick={ async () => {
                dataPlayer.sheet.hitPoints.actual = 0
                await updateDataPlayer(session.id, dataPlayer, setShowMessage);
                setType('');
                setValue(0);
                setEditHealthPoints(false);
              }}
            >
              <div className="relative flex items-center justify-center w-full col-span-1 py-1"
            >
                <div className="box__line box__line--top"></div>
                <div className="box__line box__line--right"></div>
                <div className="box__line box__line--bottom"></div>
                <div className="box__line box__line--left"></div>
                <div>Zerar Pontos de Vida</div>
              </div>
            </button>
          </div>
        }
        { 
          type !== '' &&
          <div className="grid grid-cols-4 mt-5">
            <div className="box flex items-center justify-center w-full col-span-1">
              <div className="box__line box__line--top"></div>
              <div className="box__line box__line--right"></div>
              <div className="box__line box__line--bottom"></div>
              <div className="box__line box__line--left"></div>
              <input
                type="number"
                className="text-white w-full h-full text-2xl bg-black text-center outline-none p-1 pl-3"
                placeholder="XP"
                value={ value }
                onChange={ (e: any) => {
                  if (e.target.value < 0) setValue(0);
                  else setValue(e.target.value);
                }}
              />
            </div>
            <div className="py-2 col-span-3 w-full">
              <div className="border-t-2 border-r-2 border-b-2 w-full pl-4 pr-2 py-1 rounded-r flex justify-bewteen items-center">
                <p className="w-full">{ type === 'heal' ? 'Informe o Valor da Cura' : 'Informe o Valor do Dano' }</p>
              </div>
            </div>
          </div>
        }
        {type !== '' &&
          <button
            type="button"
            className="mt-5 mb-2 p-2 w-full text-center border-2 border-white text-white bg-black cursor-pointer font-bold transition-colors"
            onClick={ async (e:any) => {
                const total = parseInt(dataPlayer.sheet.hitPoints.total);
                if (type === 'damage') {
                  let actual = parseInt(dataPlayer.sheet.hitPoints.actual);
                  let temporary = dataPlayer.sheet.hitPoints.temporary;
                  let damage = value;
                  if (temporary > 0) {
                    damage -= temporary;
                    temporary -= value;
                  }
                  if (temporary < 0) temporary = 0;
                  if (damage > 0 ) actual -= damage;
                  if (actual < 0) {
                    if (actual * (-1) >= total) {
                      setEditHealthPoints(false);
                      setShowMessage({ show: true, text: 'Seu personagem recebeu uma quantidade de Dano suficiente para chegar a Zero pontos de vida e a quantidade sobressalente exceder ou igualar seus pontos de vida Máximo. Logo, você morreu.' });
                    } else actual === 0;
                    dataPlayer.sheet.deathSaves.failures += 1;
                  }
                  dataPlayer.sheet.hitPoints.temporary = temporary;
                  dataPlayer.sheet.hitPoints.actual = actual;
                  await updateDataPlayer(session.id, dataPlayer, setShowMessage);
                } else {
                  if (temporaryHeal) dataPlayer.sheet.hitPoints.temporary = value;
                  else {
                    let actual = parseInt(dataPlayer.sheet.hitPoints.actual) + value;
                    if (actual > total) actual = total;
                    dataPlayer.sheet.hitPoints.actual = actual;
                  }
                  await updateDataPlayer(session.id, dataPlayer, setShowMessage);
                }
                setType('');
                setValue(0);
                setEditHealthPoints(false);
                e.stopPropagation();
            }}
          >
            { type === 'damage' && 'Aplicar Dano' }
            { type === 'heal' && !temporaryHeal && 'Curar' }
            { type === 'heal' && temporaryHeal && 'Adquirir' }
          </button>
        }
      </div>
    </div>
  );
}