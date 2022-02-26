import Layout from "../components/Layout";

const User = (props) => {
  return (
    <Layout>
      <h1>User info of address {props.account}</h1>{" "}
    </Layout>
  );
};

export async function getServerSideProps(props) {
  const account = props.query.account;
  return {
    props: { account },
  };
}

export default User;
