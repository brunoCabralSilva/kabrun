export default function ItemAttribute(props: { mod: number, attribute: number, name: string }) {
  const { mod, attribute, name } = props;
  return(
    <div className="w-full gap-4 text-sm mt-3">
      <div className=""> 
        <div className="relative flex items-center justify-center w-full ">
          <div className="box__line box__line--top"></div>
          <div className="box__line box__line--right"></div>
          <div className="box__line box__line--bottom"></div>
          <div className="box__line box__line--left"></div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl font-bold">{ mod }</p>
            <p className="text-xs pb-1">{ name }</p>
            <p className="text-xs pb-1">({ attribute })</p>
          </div>
        </div>
      </div>
    </div>
  );
}