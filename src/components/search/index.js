import { h, Component } from "preact";
import linkState from "linkstate";

export default class Search extends Component {
  state = { nik: "" };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.nik);
    this.setState({ nik: "" });
  };
  render(props, state) {
    return (
      <form onSubmit={this.onSubmit}>
        <div class="flex w-full justify-center mb-5">
          <input
            class="border-0 bg-gray-100 rounded mr-4 border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 lg:w-full xl:w-1/2 md:w-full"
            placeholder="Nik / No santri"
            type="text"
            name="nik"
            value={state.nik}
            onInput={linkState(this, "nik")}
          />
          <button type="submit" class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
            Cari
          </button>
        </div>
      </form>
    );
  }
}
