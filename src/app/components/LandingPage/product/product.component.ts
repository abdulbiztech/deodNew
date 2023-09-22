import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  mainImageSrc: any;
  productImages!: any[];
  slickCarouselConfig: any;

  ngOnInit(): void {
    // Load your product data here
    this.mainImageSrc = 'https://cdn.pixabay.com/photo/2023/09/05/16/40/sunrise-8235464_1280.jpg'; // Set your main product image source
    this.productImages = [
      'https://media.istockphoto.com/id/1205289672/de/foto/majest%C3%A4tischer-heller-sonnenaufgang-%C3%BCber-dem-ozean.webp?b=1&s=612x612&w=0&k=20&c=BGkXsbWCpn_YqjBttvOfD5bEy84WOWiOgEZDityC7ZA=',
      'https://media.istockphoto.com/id/531253600/de/foto/sunrise.webp?b=1&s=612x612&w=0&k=20&c=QGAe193tbOq89XT50JTwGzhggOmDqwDs49i1WoMq0CI=',
      'https://media.istockphoto.com/id/504485850/de/foto/sonnenaufgang-%C3%BCber-dem-meer.webp?b=1&s=612x612&w=0&k=20&c=NB_aH4Ic10-DK04ukn-ufZuIiars6m2svVJY0OXsBfI=',
    ]; // Set your product images

    // Configure the image slider
    this.slickCarouselConfig = {
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      centerMode: true,
      centerPadding: '0',
      focusOnSelect: true,
    };
  }
}
