import React from "react";

const Table = (props) => {
  const basis = props.colNum;
  return (
    <div className="flex flex-col">
      {/* TABLE HEADER */}
      <table className="table-auto border-collapse">
        <thead className="">
          <tr>
            {props.headers.map((item, index) => (
              <th
                key={index}
                className={`text-[0.667rem] text-left font-medium lg:text-[1.5rem] ` + (index === 0? `w-[30%] rounded-tl-[0.5rem] ` : `w-[20%]`) + ` bg-lightorange px-[0.667rem] py-[0.667rem] lg:py-[1.125rem] lg:px-[2.25rem]`}
              >
                {item}
              </th>
            ))}
            <th className="bg-lightorange rounded-tr-[0.5rem]"></th>
          </tr>
        </thead>
        <tbody>
          {props.loading && (
            <tr>
              <td colSpan={basis} className="border-b-[1px]">
                <div className="flex justify-center py-[0.25rem] lg:py-[1.25rem]">
                  <p className="text-[0.667rem] lg:text-[1.25rem]">
                    Memuat...
                  </p>
                </div>
              </td>
            </tr>
          )}
          {!props.loading && props.data.length === 0 && (
            <tr>
              <td colSpan={basis} className="border-b-[1px]">
                <div className="flex justify-center py-[0.25rem] lg:py-[1.25rem]">
                  <p className="text-[0.667rem] lg:text-[1.25rem]">
                    {props.emptyMessage}
                  </p>
                </div>
              </td>
            </tr>
          )}
          {!props.loading && props.data.length > 0 && (
            <>
              {props.data.map((item, index) => (
                <tr key={index} className="border-b-[1px]">
                  {Object.keys(item).map((key, index) => (
                    <td key={index} className="text-[0.667rem] lg:text-[1.25rem] px-[0.667rem] py-[0.25rem] lg:px-[2.25rem] lg:py-[1.25rem]">{item[key]}</td>
                  ))}
                  <td>
                    <a
                      href="#"
                      className="text-[0.667rem] flex justify-end underline hover:cursor-pointer lg:text-[1.25rem] px-[0.667rem] py-[0.25rem] lg:px-[2.25rem] lg:py-[1.25rem]"
                      onClick={() => deleteFunction(item.namaPenyakit)}
                    >
                      Hapus
                    </a>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
