import { h, Component } from "preact";
import Search from "../../components/search";
import Hero from "../../components/hero";
import SantriAssesment from "../../components/assessments";
import UserProfile from "../../components/santri_profile";
import Page404 from "../../components/404";

export default class Home extends Component {
  state = { loading: true, not_found: false, user_profile: "", book_id: null, assessments: [] };

  fetchData = async (data) => {
    let options = {
      method: data.method,
      json: true,
      ...(data.body && { body: data.body }),
    };
    let response = await fetch(data.url, options);
    return response.status == "200" ? await response.json() : false;
  };

  getBooks = async (id) => {
    console.log(id)
    let data = {
      url: `https://api-tpq1-nurulhuda.herokuapp.com/assessments?book=${id}&_sort=id:DESC`,
      method: "GET",
      return_type: "json",
    };
    let resp = await this.fetchData(data);
    this.setState({
      assessments: resp,
    });
  };

  getProfile = async (nik) => {
    console.log(nik)
    let data = {
      url: `https://api-tpq1-nurulhuda.herokuapp.com/santris?nik=${nik}`,
      method: "GET",
      return_type: "json",
    };
    let resp = await this.fetchData(data);
    if (resp) {
      let { books, ...restOf } = resp[0];
      this.setState({
        user_profile: restOf,
        loading: false,
        not_found: false,
        ...(books.length && { book_id: books[0].id }),
      });
      if (books.length) {
        this.getBooks(books[0].id);
      }
    } else {
         this.setState({not_found:true})
    }
  };
  searchItem = async (nik) => {
    this.setState({
      loading: true,
      user_profile: "",
      book_id: null,
      assessments: [],
    });
    this.getProfile(nik);
  };
  render(props, { assessments, user_profile, not_found }) {
    return (
      <section class="text-gray-700 body-font">
        <div class="container px-5 py-10 mx-auto flex flex-col">
          <Hero />
          <Search onSubmit={this.searchItem} />
          {not_found && (
            <Page404/>
          )}
          {user_profile && (
            <UserProfile user_profile={user_profile} edit={false} />
          )}
          {assessments && (
            <SantriAssesment assessments={assessments} admin={false} />
          )}
        </div>
      </section>
    );
  }
}
