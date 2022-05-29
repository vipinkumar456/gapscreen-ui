import { Component, OnInit } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpService } from 'src/app/services/http.service';
import { PATH } from 'src/app/app.constant';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialogComponent } from 'src/app/components';
@Component({
  selector: 'app-customer-rfi',
  templateUrl: './customer-rfi.component.html',
  styleUrls: ['./customer-rfi.component.scss']
})
export class CustomerRfiComponent implements OnInit {

  category;
  categories: any;
  localCategories: any;
  subCategory;
  subCategories;
  comment;
  inputData: any;
  type: any;
  companyId:any
  companyInfoData:any;
  constructor(
    private httpService: HttpService,
    private ref: DynamicDialogRef,
    private dialogService: DynamicDialogConfig,
    public DialogService: DialogService,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    console.log(this.dialogService);
    this.inputData = this.dialogService.data;
    this.type = this.inputData.type;
    this.getCategory();
    this.prepareLocalCategories();
  }


  getCategory() {
    if (this.type == 'companyInfo') {
      this.httpService.getData(PATH.GET_DROPDOWNS + '/' + 'companyInfoCategory').subscribe(res => {
        console.log(res);
        this.categories = res;
      });
    }

    if (this.type == 'uploadDocument') {
      this.httpService.getData(PATH.GET_DROPDOWNS + '/' + 'companyInfoDocumentCategory').subscribe(res => {
        console.log(res);
        this.categories = res;
      });
    }


  }

  prepareLocalCategories() {
    if (this.type == 'companyInfo') {
      this.localCategories = [
        { label: 'Particular Information', value: 'particularInformation' },
        { label: 'Registered Address', value: 'registeredAddress' },
        { label: 'Operational Address', value: 'operationalAddress' },
        { label: 'Previous Address', value: 'previousAddress' },
        { label: 'Board of Directors', value: 'boardOfDirectors' },
        { label: 'Shareholders', value: 'shareholders' },
        { label: 'Parent Company', value: 'parentCompany' },
        { label: 'Branch in other Country', value: 'branchInOtherCountry' },
        { label: 'Bank Information', value: 'bankInformation' }
      ];
    }

    if (this.type == 'uploadDocument') {
      this.localCategories = [
        { label: 'Upload Documents', value: 'uploadDocuments' },
        { label: 'Identity Documents for Shareholders', value: 'documentsShareholders' },
        { label: 'Identity Documents for Directors / Partners /Owners', value: 'documentsDirectors' },
        { label: 'Contracts & Key Contacts Information', value: 'contractsInformation' }
      ];
    }

  }

  categoryChange(itm) {
    console.log(itm.target.value);
    let selectedCategory = this.localCategories.filter((o) => {
      return o.label == itm.target.value;
    });
    selectedCategory = selectedCategory[0]['value'];
    console.log(selectedCategory);
    this.httpService.getData(PATH.GET_DROPDOWNS + '/' + selectedCategory).subscribe((res): any => {
      console.log(res);
      this.subCategories = res;
      this.subCategories = this.subCategories.map(elm => { return { label: elm.name, value: elm.name } });
    });
  }

  close() {
    this.ref.close();
  }

  submit() {
    if (!this.category) {
      this.toastrService.error('Please fill Category');
      return;
    }
    if (!this.subCategory || this.subCategory.length == 0) {
      this.toastrService.error('Please fill Sub-Category');
      return;
    }

    if (this.category && this.subCategory) {
      let payload = { category: this.category, subCategory: this.subCategory, comment: this.comment, companyInformationId: this.inputData.companyInformationId, organizationId: this.inputData.organizationId };
      console.log(payload);
      this.spinnerService.show();
      this.httpService.postData(PATH.RFI, payload).subscribe(
        (res) => { 
          console.log(res);
          this.spinnerService.hide();
          if (this.type == 'companyInfo') {
            this.ref.close();
            let modelRef = this.modalService.open(SuccessDialogComponent, {
              ariaLabelledBy: "modal-basic-title",
              windowClass: "center",
            })
            modelRef.componentInstance.type = 'rfi';
          }

          if (this.type == 'uploadDocument') {
            this.ref.close();
            let modelRef = this.modalService.open(SuccessDialogComponent, {
              ariaLabelledBy: "modal-basic-title",
              windowClass: "center",
            })
            modelRef.componentInstance.type = 'uploadRfi';
          }
},
        (error) => {
          this.spinnerService.hide();
          this.toastrService.error(error.message?.message);
        });
    }
  }

}
