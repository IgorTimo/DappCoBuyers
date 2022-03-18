import { ethers } from "ethers";
import { useState } from "react";
import {
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Message,
  TextArea,
} from "semantic-ui-react";
import Layout from "../../../components/Layout";
import provider from "../../../provider";
import purchaseFactory from "../../../purchaseFactory";
import fromDateToSeconds from "../../../utils/convert/fromDateToSeconds";
import getPurchaseByHash from "../../../utils/web2/getPurchaseByHash";
import createNewPurchaseHash from "../../../utils/web2/createNewPurchaseHash";
import createNewWeb2Purchase from "../../../utils/web3/createNewWeb2Purchase";

const NewWeb2Purchase = (props) => {
  const [supplier, setSupplier] = useState();
  const [priceForOneItem, setPriceForOneItem] = useState();
  const [minItems, setMinItems] = useState();
  const [fundraisingTime, setFundraisingTime] = useState();
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [supplierInfo, setSupplierInfo] = useState();

  const [isAgreedToTheTerms, setIsAgreedToTheTerms] = useState();
  const [termsError, setTermsError] = useState(false);
  const [dropDownValue, setDropDownValue] = useState("days");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const options = [
    { key: "days", text: "days", value: "days" },
    { key: "hours", text: "hours", value: "hours" },
    { key: "minutes", text: "minutes", value: "minutes" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAgreedToTheTerms) {
      setTermsError(true);
      return;
    }

    const fundraisingTimeInSeconds = fromDateToSeconds(
      fundraisingTime,
      dropDownValue
    );

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const hash = await createNewPurchaseHash(title, desc, supplierInfo);
      const response = await createNewWeb2Purchase(
        supplier,
        priceForOneItem,
        minItems,
        fundraisingTimeInSeconds,
        hash
      );
      setIsLoading(false);
      setSuccessMessage(`Hash of transaction: ${response.hash}`);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <h1>Create New Web2 Purchase</h1>
      <Form
        onSubmit={handleSubmit}
        success={!!successMessage}
        error={!!errorMessage}
      >
        <Form.Input
          required
          fluid
          label="Title of purchase"
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        <Form.Group widths="equal">
          <Form.Field required>
            <label>Price of one item</label>
            <Input
              type="number"
              step="any"
              onChange={(event) => setPriceForOneItem(event.target.value)}
              label="ETH"
              labelPosition="right"
              placeholder="In Ether"
            />
          </Form.Field>
          <Form.Field required>
            <label>Min items to succeed</label>
            <input
              type="number"
              onChange={(event) => setMinItems(event.target.value)}
              required
              placeholder="Minimum"
            />
          </Form.Field>
          <Form.Field required>
            <label>Fundraising Time</label>
            <Input
              type="number"
              onChange={(event) => setFundraisingTime(event.target.value)}
              required
              placeholder="Duration"
              label={
                <Dropdown
                  onChange={(event, data) => setDropDownValue(data.value)}
                  defaultValue="days"
                  options={options}
                />
              }
              labelPosition="right"
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            onChange={(event) => setSupplier(event.target.value)}
            required
            fluid
            label="Address of supplier"
            placeholder="Address of supplier"
          />
          <Form.Input
            onChange={(event) => setSupplierInfo(event.target.value)}
            required
            fluid
            label="Info about supplier"
            placeholder="Link to website or sotial network"
          />
        </Form.Group>
        <Form.Field
          onChange={(event) => setDesc(event.target.value)}
          control={TextArea}
          label="About"
          placeholder="Tell us more about this purchase"
        />
        <Form.Field>
          <Form.Checkbox
            checked={isAgreedToTheTerms}
            onChange={(event, data) => {
              setIsAgreedToTheTerms(data.checked);
              setTermsError(false);
            }}
            label="I agree to the Terms and Conditions"
            error={
              termsError && {
                content: "You must agree to the terms and conditions",
                pointing: "left",
              }
            }
          />
        </Form.Field>
        <Button loading={isLoading} primary type="submit">
          Create!
        </Button>
        <Message error header="Ooops!" content={errorMessage} />
        <Message success header="Success!" content={successMessage} />
      </Form>
    </Layout>
  );
};

export default NewWeb2Purchase;
