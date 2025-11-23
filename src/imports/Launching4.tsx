import imgImage1 from "figma:asset/e30c10d7f9b16dd75f0275ed8191330fefa3bd8d.png";

function Rectangle() {
  return (
    <div className="absolute h-[53px] left-0 top-0 w-[189px]">
      <div className="absolute bg-[#fffdfd] inset-0 rounded-[25px]">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[25px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
      </div>
    </div>
  );
}

function ContinueButton() {
  return (
    <div className="absolute box-border content-stretch flex gap-[10px] h-[53px] items-center justify-center left-1/2 px-[48px] py-[13px] top-[calc(50%+305.5px)] translate-x-[-50%] translate-y-[-50%] w-[189px]" data-name="Continue-button">
      <Rectangle />
      <p className="[text-shadow:rgba(0,0,0,0.25)_0px_4px_4px] font-['Lilita_One:Regular',sans-serif] leading-[normal] mix-blend-darken not-italic relative shrink-0 text-[#780302] text-[24px] text-nowrap whitespace-pre">Continue</p>
      <div className="absolute inset-0 pointer-events-none shadow-[0px_4px_4px_0px_inset_rgba(0,0,0,0.25)]" />
    </div>
  );
}

export default function Launching() {
  return (
    <div className="bg-white relative size-full" data-name="Launching -4">
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.4067366421222687)+(var(--transform-inner-height)*0.9135454893112183)))] items-center justify-center left-[-200px] top-[-202px] w-[calc(1px*((var(--transform-inner-height)*0.4067366421222687)+(var(--transform-inner-width)*0.9135454893112183)))]" style={{ "--transform-inner-width": "649", "--transform-inner-height": "285" } as React.CSSProperties}>
        <div className="flex-none rotate-[336deg]">
          <div className="bg-gradient-to-b from-[#310100] from-[40.385%] h-[285.341px] to-[#780302] w-[648.964px]" />
        </div>
      </div>
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.4067366421222687)+(var(--transform-inner-height)*0.9135454893112183)))] items-center justify-center left-[-77.97px] top-[477.53px] w-[calc(1px*((var(--transform-inner-height)*0.4067366421222687)+(var(--transform-inner-width)*0.9135454893112183)))]" style={{ "--transform-inner-width": "626", "--transform-inner-height": "309" } as React.CSSProperties}>
        <div className="flex-none rotate-[336deg]">
          <div className="bg-gradient-to-b from-[#780302] h-[309.223px] to-[#310100] to-[97.596%] w-[625.67px]" />
        </div>
      </div>
      <div className="absolute left-1/2 size-[277px] top-[calc(50%-27.5px)] translate-x-[-50%] translate-y-[-50%]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
      </div>
      <ContinueButton />
    </div>
  );
}