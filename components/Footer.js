// Footer component

const Footer = () => {
    return (
      <div className="w-[399px] h-[26px] justify-start items-center gap-4 inline-flex">
        <div className="w-[164px] h-[26px] relative">
          <img className="w-[26px] h-[26px] left-[56px] top-0 absolute" src="https://via.placeholder.com/26x26" alt="Logo" />
          <div className="w-[73.91px] h-[20.10px] left-[83.68px] top-[3.11px] absolute"></div>
        </div>
        <div className="w-[26px] h-[0px] origin-top-left rotate-90 border border-slate-300"></div>
        <div className="text-center text-slate-300 text-xs font-bold font-['Mulish'] leading-[18px]">
          © 2022 Bitnovo. All rights reserved.
        </div>
      </div>
    );
  };

    export default Footer;  