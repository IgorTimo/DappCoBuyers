import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "semantic-ui-react";
import provider from "../provider";

const Header = (props) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const router = useRouter();

  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.on("accountsChanged", (accounts) => {
      setCurrentAccount(accounts[0]);
      router.push("/");

    });
  }

  useEffect(() => {
    provider.getSigner().getAddress().then(setCurrentAccount);
  }, []);

  return (
    <Menu size="small" style={{ marginTop: "20px" }}>
      <Link href="/">
        <a className="item">Home</a>
      </Link>
      <Link href="/">
        <a className="item">Create Web2 Purchase</a>
      </Link>
      <Link href="/">
        <a className="item">Create Web3 Purchase</a>
      </Link>

      <Menu.Menu position="right">
        <Dropdown item text="Language">
          <Dropdown.Menu>
            <Dropdown.Item>English</Dropdown.Item>
            <Dropdown.Item>Russian</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Link href={{
            pathname: '/user',
            query: { account: currentAccount },
        }}>
          <a className="item">
            <Button primary>{currentAccount}</Button>
          </a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
