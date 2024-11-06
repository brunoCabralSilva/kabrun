import { useContext, useEffect, useState } from "react";
import contexto from "../../context/context";
import { FiEdit } from "react-icons/fi";
import { FaRegSave } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import allBooks from '../../data/books.json';
import { getSessionByName, updateSession } from "../../firebase/sessions";
import EditPrinciple from "./editPrinciple";
import DeletePrinciple from "./deletePrinciple";
import { getUserByEmail } from "../../firebase/user";
import ChangeGameMaster from "./changeGameMaster";

export default function Details() {
  const { session, userEmail } = useContext(contexto);
  const [gm, setGM] = useState(false);
  const [name, setName] = useState('');
  const [books, setBooks] = useState<any>([]);
  const [listBooks, setListBooks] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [principles, setPrinciples] = useState<any>([]);
  const [gameMaster, setGameMaster] = useState('');
  const [newPrinciple, setNewPrinciple] = useState('');
  const [selectedValue, setSelectedValue] = useState(0);
  const [editName, setEditName] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editGameMaster, setEditGameMaster] = useState(false);

  const {
    setShowMessage,
    setRemoveFromSession,
    showChangeGameMaster, setShowChangeGameMaster,
    showEditPrinciple, setShowEditPrinciple,
    showDeletePrinciple, setShowDeletePrinciple
  } = useContext(contexto);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setDescription(session.description);
    setName(session.name);
    setBooks(session.books);
    setGameMaster(session.gameMaster);
    setPrinciples(session.principles);
    setListBooks(
      allBooks
        .filter((book: any) => !session.books.includes(book))
        .sort((a: string, b: string) => a.localeCompare(b))
    );
    if (userEmail === session.gameMaster) setGM(true);
    else setGM(false);
  }, [session]);

  const updateName = async () => {
    const sessionWithName = await getSessionByName(name, setShowMessage);
    if (sessionWithName) {
      setShowMessage({ show: true, text: 'Já existe uma Sessão com este nome. ' });
      setName(session.name);
    } else {
      const sessionData = session;
      if (name !== sessionData.name) {
        session.name = name;
        await updateSession(sessionData, setShowMessage);
      }
    }
  }

  const updateDescription = async () => {
    const sessionData = session;
    if (description !== sessionData.description) {
      session.description = description;
      await updateSession(sessionData, setShowMessage);
    }
  }

  const updateBooks = async (list: any) => {
    const sessionData = session;
    session.books = list;
    await updateSession(sessionData, setShowMessage);
  }

  const updatePrinciples = async (list: any) => {
    const sessionData = session;
    session.principles = list;
    await updateSession(sessionData, setShowMessage);
  }

  const updateGameMaster = async () => {
    if (gameMaster !== session.gameMaster) {
      const user = await getUserByEmail(gameMaster, setShowMessage);
      if (user.email) {
        setShowChangeGameMaster(
          {
            show: true,
            data: {
              email: gameMaster,
              sessionId: session.id,
              displayName: user.firstName + ' ' + user.lastName
            }
          });
      } else {
        setShowMessage({ show: true, text: 'Necessário inserir o email de um usuário que já esteja cadastrado na plataforma.' });
        setGameMaster(session.gameMaster);
      }
    }
  }
  
  return(
    <div className="text-white h-90vh overflow-y-auto pr-1">
      { showEditPrinciple.show && <EditPrinciple /> }
      { showDeletePrinciple.show &&  <DeletePrinciple /> }
      { showChangeGameMaster.show && <ChangeGameMaster setGameMaster={setGameMaster} /> }
      <div className="flex flex-col items-center justify-start h-full w-full">
        {/* Name */}
        <div
          className={`w-full mt-2 capitalize flex justify-between items-center ${ gm && 'cursor-pointer' } pr-2 border-2 border-white mb-2`}
          onClick={() => { if (gm) setEditName(true) }}
        >
          { 
            !editName &&
            <span className="text-white font-bold text-2xl my-3 capitalize break-words w-full px-4">
              { name }
            </span>
          }
          { 
            editName && gm &&
            <input
              type="text"
              className="border-2 border-white text-white text-left w-full mr-1 bg-black p-2 text-2xl break-words"
              placeholder="Nome"
              value={ name }
              onChange={(e) => {
                const sanitizedValue = e.target.value.replace(/\s+/g, ' ');
                setName(sanitizedValue);
              }}
            />
          }
          {
            gm &&
            <div>
              { 
                editName
                ? <FaRegSave
                    onClick={(e:any) => {
                      updateName();
                      setEditName(false);
                      e.stopPropagation();
                    }}
                    className="text-2xl text-white"
                  />
                : <FiEdit
                    onClick={
                      (e:any) => {
                        setEditName(true);
                        e.stopPropagation();
                      }}
                    className="text-2xl text-white"
                  />
              }
            </div>
          }
        </div>
        {/* Livros */}
        <div className="w-full mb-2 flex-col font-bold border-2 border-white">
          <div className="pl-4 pr-2 pt-2 flex justify-between items-center w-full">
            <div
              className="text-white w-full flex-col items-center justify-center"
            >
              Livros:
            </div>
            <div>
            </div>
          </div>
          <div className="w-full h-full">
            <div
              className="text-white font-normal p-4 text-justify w-full h-full break-words"
            >
              {
                gm &&
                <select
                  className="bg-black w-full text-white p-2 mb-2 border-2 border-white"
                  value={selectedValue}
                  onChange={ (e: any) => {
                    if (e.target.value === 'all') {
                      setBooks(allBooks);
                      updateBooks(allBooks);
                    } else if (e.target.value === 'remove') {
                      setBooks(["Player's Handbook"]);
                      updateBooks(["Player's Handbook"]);
                    } else {
                      setBooks(
                        [...books, e.target.value]
                        .sort((a: string, b: string) => a.localeCompare(b))
                      );
                      setListBooks(
                        listBooks
                        .filter((book: any) => book !== e.target.value)
                        .sort((a: string, b: string) => a.localeCompare(b))
                      );
                      updateBooks([...books, e.target.value]);
                    }
                    setSelectedValue(0);
                  }}
                >
                  <option className="w-full text-center sm:text-left" value={0} selected disabled>
                    Selecione um Livro
                  </option>
                  <option value="all">
                    Aditionar todos os Livros
                  </option>
                  <option value="remove">
                    Remover todos os Livros
                  </option>
                  {
                    listBooks.map((book: any, index: number) => (
                      <option
                        key={index}
                        value={book}
                      >
                        { book }
                      </option>
                    ))
                  }
                </select>
              }
              {
                books.map((book: any, index: number) => (
                  <div
                    key={index}
                    className="flex w-full justify-between p-2"
                  >
                    <div>{ book }</div>
                    {
                      book !== "Player's Handbook" && gm &&
                      <button
                        type="button"
                        className="text-2xl"
                        onClick={ () => {
                          setListBooks(
                            [...listBooks, book]
                            .sort((a: string, b: string) => a.localeCompare(b))
                          );
                          setBooks(
                            books
                              .filter((bookItem: any) => bookItem !== book)
                              .sort((a: string, b: string) => a.localeCompare(b))
                          );
                          updateBooks(books
                            .filter((bookItem: any) => bookItem !== book)
                            .sort((a: string, b: string) => a.localeCompare(b))
                          );
                        }}
                      >
                        <MdDelete />
                      </button>
                    }
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="w-full mb-2 flex-col font-bold border-2 border-white">
          <div className="pl-4 pr-2 pt-2 flex justify-between items-center w-full">
            <div
              className={`text-white w-full ${gm && 'cursor-pointer'} flex-col items-center justify-center`}
              onClick={ () => { if (gm) setEditDescription(true) }}
            >
              Descrição:
            </div>
            <div>
              {
                gm &&
                <div>
                  { 
                    editDescription
                    ? <FaRegSave
                        onClick={(e: any) => {
                          updateDescription();
                          setEditDescription(false);
                          e.stopPropagation();
                        }}
                        className="text-2xl text-white cursor-pointer mb-1"
                      />
                    : <FiEdit
                        onClick={(e: any) => {
                          setEditDescription(true);
                          e.stopPropagation();
                        }}
                        className="text-2xl text-white cursor-pointer" />
                  }
                </div>
              }
            </div>
          </div>
          <div className="w-full h-full">
            { 
              editDescription ?
              <textarea
                className="text-white bg-black font-normal p-4 w-full h-72 cursor-pointer break-words text-justify border-t-white border"
                value={ description }
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/\s+/g, ' ');
                  setDescription(sanitizedValue);
                }}
              />
              : <div
                  className={`text-white font-normal p-4 text-justify w-full h-full ${gm && 'cursor-pointer'} break-words`}
                  onClick={() => { if (gm) setEditDescription(true) }}
                >
                { description }
              </div>
            }
          </div>
        </div>
        {/* Principles */}
        <div className="w-full mb-2 flex-col font-bold border-2 border-white">
          <div className="pl-4 pr-2 pt-2 flex flex-col justify-between items-center w-full">
            <div className="text-white w-full flex-col items-center justify-center">
              Princípios da Crônica:
            </div>
            <div className="flex w-full mt-4">
              <input
                type="text"
                className=" border-2 border-white text-white text-left w-full mr-1 bg-black p-2 break-words outline-none"
                placeholder="Digite o Princípio"
                value={ newPrinciple }
                onChange={(e) => {
                  const sanitizedValue = e.target.value.replace(/\s+/g, ' ');
                  setNewPrinciple(sanitizedValue);
                }}
              />
              <button
                type="button"
                onClick={ () => {
                  if (!principles.find((principle: any) => principle.description === newPrinciple)) {
                    if (newPrinciple !== '' && newPrinciple !== ' ') {
                      setPrinciples([ ...principles, { description: newPrinciple, user: userEmail } ]);
                      updatePrinciples([ ...principles, { description: newPrinciple, user: userEmail } ]);
                    } setNewPrinciple('');
                  }
                }}
                className="border-2 border-white bg-black px-2"
              >
                +
              </button>
            </div>
          </div>
          <div>
          { 
            <div
              className="text-white font-normal p-4 text-justify w-full h-full cursor-pointer break-words"
            >
              {
                principles.map((principle: any, index: number) => (
                  <div key={index} className="border-2 p-3 mt-2">
                    <div>
                      <div>{ principle.description }</div>
                      <div className="text-sm">({ principle.user })</div>
                    </div>
                    {
                      (userEmail === principle.user || userEmail === gameMaster) &&
                      <div className="flex w-full justify-end items-center gap-2">
                        <FiEdit
                          onClick={
                            (e:any) => {
                              setShowEditPrinciple({ show: true, description: principle.description });
                              e.stopPropagation();
                            }}
                          className="text-xl text-white"
                        />
                        <MdDelete
                          className="text-2xl"
                          onClick={() => setShowDeletePrinciple({ show: true, description: principle.description })}
                        />
                      </div>
                    }
                  </div>
                ))
              }
            </div>
          }
          </div>
        </div>
        {/* Narrador */}
        <div
          className={`w-full mb-2 flex flex-col justify-between items-center ${gm && 'cursor-pointer'} p-2 border-2 border-white`}
          onClick={() => { if (gm) setEditGameMaster(true) }}
        >
          <div className="flex w-full">
            <span className="text-white break-words w-full p-2">
              <span className="font-bold pr-1">Narrador:</span>
            </span>
            {
              gm &&
              <div>
              { 
                editGameMaster
                  ? <FaRegSave
                      onClick={(e:any) => {
                        updateGameMaster();
                        setEditGameMaster(false);
                        e.stopPropagation();
                      }}
                      className="text-2xl text-white mr-1"
                    />
                  : <FiEdit
                      onClick={
                        (e:any) => {
                          setEditGameMaster(true);
                          e.stopPropagation();
                        }}
                      className="text-2xl text-white"
                    />
              }
              </div>
            }
          </div>
          { 
            editGameMaster 
            ? <input
              type="text"
              className="text-sm border border-white text-white text-left w-full bg-black p-2"
              placeholder="Nome"
              value={ gameMaster }
              onChange={(e) => setGameMaster(e.target.value)}
            />
            : <span className="border border-transparent text-sm text-white w-full p-2 break-words">{ gameMaster }</span>
          }
        </div>
        {/* Data de Criação */}
        <p className="mt-1 text-white sm:text-left w-full text-center border-2 border-white p-4">
          <span className="font-bold pr-1">Data de Criação:</span>
          <span>{ session.creationDate }</span>
        </p>
        <button
          type="button"
          className="my-2 p-2 w-full text-center border-2 border-white text-white bg-red-800 cursor-pointer font-bold hover:bg-red-900 transition-colors"
          onClick={() => setRemoveFromSession({show: true, gm }) }
        >
          Sair da Sessão
        </button>
      </div>
    </div>
  );
}