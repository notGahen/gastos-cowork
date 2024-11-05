import {UserTransaction} from "@/components/UserTransaction";
import { disrootRequest } from "@/lib/fn"

export default async function Home() {
  const userList = await disrootRequest("/members")
  return (
    <div>
      <main>
        { userList ? (
          <UserTransaction userList={userList} />
        ) : (
          <>
            Cargando ...
          </>
        )}
      </main>
      <footer></footer>
    </div>
  );
}
