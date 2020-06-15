import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  providers: [DataService]
})
export class ShoppingItemComponent implements OnInit {
  shoppingItemList: Item[] = [];
  selectedItem: Item;
  toggleForm = false;

  constructor(private dataService: DataService) { }

  getItems(){
    this.dataService.getShoppingItems()
      .subscribe( items => {
        this.shoppingItemList = items;
        console.log('data from dataservice: ' + this.shoppingItemList[0].itemName);
      });
  }

  addItem(form) {
    // tslint:disable-next-line:prefer-const
    let newItem: Item = {
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: false
    };
    this.dataService.addShoppingItem(newItem)
      .subscribe(item => {
        console.log(item);
        this.getItems();
      });
  }

  deleteItem(id) {
    this.dataService.deleteShoppingItem(id)
      .subscribe( data => {
        console.log(data);
        if (data.n === 1) {
          for (let i = 0; this.shoppingItemList.length; i++) {
            if (id === this.shoppingItemList[i]._id) {
              this.shoppingItemList.splice(i, 1);
            }
          }
        }
      });
  }

  editItem(form) {
    // tslint:disable-next-line:prefer-const
    let newItem: Item = {
      _id: this.selectedItem._id,
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: this.selectedItem.itemBought
    };
    this.dataService.updateShoppingItem(newItem)
      .subscribe(result => {
        console.log('original item to be updated with old values:' + result);
        this.getItems();
      });
    this.toggleForm = !this.toggleForm;
  }

  showEditForm(item) {
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm;
  }

  updateItemCheckBox(item) {
    item.itemBought = !item.itemBought;
    this.dataService.updateShoppingItem(item)
      .subscribe(result => {
        console.log('original checkbox value:' + result.itemBought);
        this.getItems();
      });
  }

  ngOnInit() {
    this.getItems();
  }

}
