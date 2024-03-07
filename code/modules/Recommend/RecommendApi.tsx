import Api, {Method} from '../../bases/network/Api';

export interface RecommendItemModel {
  id: string;
  title: string;
  pic: string;
}

export interface RecommendModel {
  movies: RecommendItemModel[];
}

export default class RecommendApi extends Api<RecommendApi, RecommendModel> {
  city_id = '1';
  dataSource: RecommendItemModel[] = [];
  constructor() {
    super();
    this.path = 'devdawei/testapi/raw/master/movies.json';
    this.method = Method.get;
    // this.isPageRequest = true;
    // this.parameters = {
    //   xxx: xxx,
    // };
  }

  parse(dataModel: RecommendModel) {
    if (this.isRefresh()) {
      this.dataSource = dataModel.movies;
    } else {
      this.dataSource = this.dataSource.concat(dataModel.movies);
    }
  }
}
