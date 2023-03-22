import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  
  imageData: any;

  products: Product[] = [
    {
      id: '1',
      name: 'Panela',
      imageLink: 'https://github.com/JoaoDiasDev/cha-de-panela-joaodias/blob/master/weddingshower.productsImages/panela_vermelha_com_revestimento_ceramico.png',
      productLink: 'https://www.amazon.com.br/Conjunto-Panelas-Ambiente-Revestimento-Cer%C3%A2mica/dp/B089P3GM79/ref=asc_df_B089P3GM79/?tag=googleshopp00-20&linkCode=df0&,hvadid=379765457684&hvpos=&hvnetw=g&hvrand=5986900585248606163&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1031709&hvtargid=pla-924746208903&psc=1',
      reserved: false,
      whoReserved: '',
    },
    {
      id: '2',
      name: 'Batedeira',
      imageLink: 'https://github.com/JoaoDiasDev/cha-de-panela-joaodias/blob/master/weddingshower.productsImages/batedeira.png',
      productLink: 'https://www.oster.com.br/batedeira-planetaria-oster-bowl-inox-ii/p?idsku=12757&gclid=CjwKCAjwq-WgBhBMEiwAzKSH6Ics7t6KyTsVsaOnbTEHs_-eR6rfYizxs9QtgK_JYP3ByzpeeWbJCxoCz9IQAvD_BwE',
      reserved: false,
      whoReserved: '',
    },
    {
      id: '3',
      name: 'Air Fryer',
      imageLink: 'https://github.com/JoaoDiasDev/cha-de-panela-joaodias/blob/master/weddingshower.productsImages/fritadeira-air-fry-12-litros.png',
      productLink: 'https://www.casasbahia.com.br/fritadeira-eletrica-sem-oleo-air-fry-britania-oven-bfr2100p-12l-preta-55020319/p/55020320?utm_medium=Cpc&utm_source=GP_PLA&IdSku=55020320&idLojista=10037&tipoLojista=1P&&utm_campaign=gg_pmax_core_elpo_apostas&gclid=CjwKCAjwq-WgBhBMEiwAzKSH6BXO3V1VTu5B_ddfCSeA1e-9X8XUxU1RbGstrQRf0v7IIyFNDr3WHBoCeMMQAvD_BwE&gclsrc=aw.ds',
      reserved: false,
      whoReserved: '',
    },
    {
      id: '4',
      name: 'Liquidificador',
      imageLink: 'https://github.com/JoaoDiasDev/cha-de-panela-joaodias/blob/master/weddingshower.productsImages/liquidificador.png',
      productLink: 'https://www.amazon.com.br/Liquidificador-1400-Full-Preto-Oster/dp/B08DFJRCJB/ref=asc_df_B08DFJRCJB/?tag=googleshopp00-20&linkCode=df0&hvadid=379716021585&hvpos=&hvnetw=g&hvrand=1722747199377179463&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1031709&hvtargid=pla-943565787307&psc=1',
      reserved: false,
      whoReserved: '',
    },
    {
      id: '5',
      name: 'Talheres',
      imageLink: 'https://github.com/JoaoDiasDev/cha-de-panela-joaodias/blob/master/weddingshower.productsImages/talheres.png',
      productLink: 'https://www.amazon.com.br/Tramontina-66902300-Faqueiro-Estojo-Madeira/dp/B0772VX7VT/ref=asc_df_B0772VX7VT/?tag=googleshopp00-20&linkCode=df0&hvadid=379792705886&hvpos=&hvnetw=g&hvrand=3180954865894463186&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1031709&hvtargid=pla-848812598625&psc=1',
      reserved: false,
      whoReserved: '',
    },
    {
      id: '6',
      name: 'Panela',
      imageLink: 'https://github.com/JoaoDiasDev/cha-de-panela-joaodias/blob/master/weddingshower.productsImages/panela_vermelha_com_revestimento_ceramico.png',
      productLink: 'https://www.amazon.com.br/Conjunto-Panelas-Ambiente-Revestimento-Cer%C3%A2mica/dp/B089P3GM79/ref=asc_df_B089P3GM79/?tag=googleshopp00-20&linkCode=df0&hvadid=379765457684&hvpos=&hvnetw=g&hvrand=5986900585248606163&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1031709&hvtargid=pla-924746208903&psc=1',
      reserved: false,
      whoReserved: '',
    },
    {
      id: '7',
      name: 'Panela',
      imageLink: 'https://github.com/JoaoDiasDev/cha-de-panela-joaodias/blob/master/weddingshower.productsImages/panela_vermelha_com_revestimento_ceramico.png',
      productLink: 'https://www.amazon.com.br/Conjunto-Panelas-Ambiente-Revestimento-Cer%C3%A2mica/dp/B089P3GM79/ref=asc_df_B089P3GM79/?tag=googleshopp00-20&linkCode=df0&hvadid=379765457684&hvpos=&hvnetw=g&hvrand=5986900585248606163&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1031709&hvtargid=pla-924746208903&psc=1',
      reserved: false,
      whoReserved: '',
    },
  ];
  constructor(private http: HttpClient) {

  }

  getImageData(imageUrl: string) {
    this.http.get(imageUrl, { responseType: 'blob' }).subscribe((data) => {
      this.imageData = URL.createObjectURL(data);
    });
  }

  ngOnInit(): void {
      this.products
  }
}
