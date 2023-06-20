import React from "react";
import noProductImg from "../../../../assets/img/no-product.png";

/**
 * The loading spinner component (static)
 * @constructor
 */
const NoProducts = () => {
  return (
    <>
      <div>
        <img src={noProductImg} alt="" className="m-auto text-center d-block" />
      </div>
    </>
  );
};
export default NoProducts;
