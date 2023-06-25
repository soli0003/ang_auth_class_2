import { Component, Input } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { ProdService } from '../Services/prod.service';
import { Router } from '@angular/router';
import { CartService } from '../Services/cart.service';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
    imageSelected = false;
    selectedImage: File | null = null;
    title = 'myapp';
    myProducts: any[] = []
    mProducts: any[] = []
    @Input() cart: any[] = [];


  constructor(
    private prodSrv: ProdService,
    private auth: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.showData();
  }

  showData() {
    this.prodSrv.showProducts().subscribe(res => this.mProducts = res);
  }

  buy(price: number, desc: string, id: number) {
    const existingItem = this.cartService.getCartItemById(id);
    if (existingItem) {
      this.cartService.updateQuantity(existingItem, true);
    } else {
      const item = { amount: 1, desc, price, id };
      this.cartService.addToCart(item);
    }
  
    console.log(this.cartService.getCartItems());
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);


    this.imageSelected = true;
  }

  add(price: number, desc: any) {
    if (this.selectedImage) {
      const prodData = new FormData();
      prodData.append('image', this.selectedImage , this.selectedImage.name);
      prodData.append('description', desc);
      prodData.append('price', price.toString());
      this.prodSrv.addProduct(prodData).subscribe(res => console.log(res))
    }
    this.showData()
  }

  

  del(id: number) {
    this.prodSrv.delProduct(id).subscribe(
      res => {
        console.log(res);
        this.showData();
      },
      error => {
        if (error.status === 401) {
          this.auth.showPromptForLoginOrRegister();
        }
      }
    );
  }

  upd(price: number, desc: string, id: number, imageInput: any) {
  const imageFile: File | null = imageInput.files[0] || null;
  const product = { price, desc };

  this.prodSrv.updProduct(product, id, imageFile).subscribe(
    res => {
      console.log(res);
      this.showData();
    },
    error => {
      if (error.status === 401) {
        this.auth.showPromptForLoginOrRegister();
      }
    }
  );
}


  checkOut() {
    this.auth.checkOut(this.cart).subscribe(
      res => console.log(res),
      error => {
        if (error.status === 401) {
          this.auth.showPromptForLoginOrRegister();
        }
      }
    );
  }

  login(pwd: string, user: string) {
    this.auth.login(pwd, user).subscribe(res => {
      localStorage.setItem('token', res.access);
    });
  }

  onImageSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadImage(file);
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    this.prodSrv.uploadImage(formData).subscribe(
      res => {
        // Handle the successful upload response
        console.log(res);
      },
      error => {
        // Handle the upload error
        console.error(error);
      }
    );
  }
  
}

