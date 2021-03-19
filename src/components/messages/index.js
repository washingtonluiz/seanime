import React from "react";
import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

function Messages(props) {
  return (
    <ReduxToastr
      timeOut={5000}
      newestOnTop={false}
      preventDuplicates={true}
      position="top-right"
      transitionIn="bounceInDown"
      transitionOut="fadeOut"
    />
  );
}

export default Messages;
