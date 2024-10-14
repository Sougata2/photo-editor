import { createClient } from "pexels";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const client = createClient(
    "hWcrVhqj9vwGlBxZ6lfAUFEQMOqshhVotTUQdma5YLTAIZhO8MJmFouq"
  );

  return (
    <div>
      <center>
        <h1>Photo Editor</h1>
      </center>
      <Outlet context={[client]} />
    </div>
  );
}

export default AppLayout;
