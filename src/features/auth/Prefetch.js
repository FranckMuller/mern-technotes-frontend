import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "app/store";
import { notesApiSlice } from "features/notes/notes-api";
import { usersApiSlice } from "features/users/users-api";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());

    return () => {
      console.log("unsubscribe");
      users.unsubscribe();
      notes.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
