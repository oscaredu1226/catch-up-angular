import {Component, inject, OnInit} from '@angular/core';
import {Source} from "../../../news/model/source.entity";
import {Article} from "../../../news/model/article.entity";
import {NewsApiService} from "../../../news/services/news-api.service";
import {LogoApiService} from "../../../shared/services/logo-api.service";
import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {SourceListComponent} from "../../../news/components/source-list/source-list.component";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";
import {ArticleListComponent} from "../../../news/components/article-list/article-list.component";
import {FooterContentComponent} from "../footer-content/footer-content.component";

@Component({
  selector: 'app-side-navigation-bar',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatToolbar,
    SourceListComponent,
    MatIconButton,
    MatIcon,
    LanguageSwitcherComponent,
    ArticleListComponent,
    FooterContentComponent
  ],
  templateUrl: './side-navigation-bar.component.html',
  styleUrl: './side-navigation-bar.component.css'
})
export class SideNavigationBarComponent implements OnInit{

  protected sources: Array<Source> = [];
  protected articles: Array<Article> = [];
  private newsApi: NewsApiService = inject(NewsApiService);
  private logoApi: LogoApiService = inject(LogoApiService);

  searchArticlesForSource(source: any) {
    console.log(`Selected source is ${source.id}`);
    this.newsApi.getArticlesBySourceId(source.id)
      .subscribe((data: any) => {
        this.articles = data['articles'];
        this.articles.forEach((article: { source: { urlToLogo: any; url: any;};}) => {
          article.source.urlToLogo = source.urlToLogo;
          article.source.url = source.url;
        });
        console.log(this.articles);
      });
  }

  onSourceSelected(source: Source){
    console.log(source.name);
    this.searchArticlesForSource(source);
  }

  ngOnInit(): void {
    this.newsApi.getSources()
      .subscribe((data: any) => {
        this.sources = data['sources'];
        this.sources.forEach((source: { urlToLogo: string;}) =>
        source.urlToLogo = this.logoApi.getUrlToLogo(source));
        console.log(this.sources);
        this.searchArticlesForSource(this.sources[0]);
      });
  }

}
