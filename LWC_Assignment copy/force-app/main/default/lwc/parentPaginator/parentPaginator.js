import { LightningElement, track, wire } from 'lwc';
import fetchRecords from '@salesforce/apex/CustomObjectController.fetchRecords';
import searchCompanies from '@salesforce/apex/CustomObjectController.searchCompanies';

const columns = [
    { label: "Id", fieldName: "Id" },
    { label: "Name", fieldName: "Name" },
    { label: "Email", fieldName: "Email__c" },
    {
        label: "",
        type: "button",
        typeAttributes: {
            label: "Edit",
            variant: "brand",
            name: "edit",
            title: "Edit",
            disabled: false,
            value: "edit",
            iconPosition: "left"
        },
        cellAttributes: { alignment: "center" },
        initialWidth: 80
    },
    {
        label: "",
        type: "button",
        typeAttributes: {
            label: "Delete",
            variant: "destructive",
            name: "delete",
            title: "Delete",
            disabled: false,
            value: "delete",
            iconPosition: "left"
        },
        cellAttributes: { alignment: "center" },
        initialWidth: 80
    }
];

export default class ParentPaginator extends LightningElement {
    @track columns = columns;
    @track data;
    @track items;
    @track startingRecord = 1;
    @track endingRecord = 0;
    @track totalRecordCount;
    @track page = 1;
    @track totalPage;
    @track pageSize = 5;
    @track searchTerm = '';
    @track editRecordId;
    @track deleteRecordId;

    @wire(fetchRecords) 
    wiredFetchRecords(result) {
        this.handleFetchResult(result);
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if (actionName === 'edit') {
            this.editRecordId = row.Id;
        } else if (actionName === 'delete') {
            this.deleteRecordId = row.Id;
        }
    }

    handleDeleteClose() {
        this.deleteRecordId = null;
        this.searchTerm='';
    }

    handleUpdateClose() {
        this.editRecordId = null;
        this.searchTerm='';
    }

    handleFetchResult(result) {
        if (result.data) {
            this.items = result.data;
            this.totalRecordCount = result.data.length;
            this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
            this.updateData();
        }
    }

    updateData() {
        this.endingRecord = this.page * this.pageSize;
        this.endingRecord = (this.endingRecord > this.totalRecordCount) ? this.totalRecordCount : this.endingRecord;
        this.data = this.items.slice(this.startingRecord - 1, this.endingRecord);
    }

    prevHandler(event) {
        if (this.page > 1) {
            this.page = this.page - 1;
            this.startingRecord = (this.page - 1) * this.pageSize + 1;
            this.updateData();
        }
    }

    nextHandler(event) {
        if (this.page < this.totalPage && this.page != this.totalPage) {
            this.page = this.page + 1;
            this.startingRecord = (this.page - 1) * this.pageSize + 1;
            this.updateData();
        }
    }

    handleSearch(event) {
        this.searchTerm = event.target.value;
        this.performSearch();
    }


    performSearch() {
            if (this.searchTerm) {
                searchCompanies({ searchTerm: this.searchTerm })
                    .then(result => {
                        this.items = result;
                        this.totalRecordCount = result.length;
                        this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
                        this.updateData();
                    })
                    .catch(error => {
                        console.log('Error in searching companies:', error);
                    });
            } else {
                // Fetch all records when the search term gets empty
                fetchRecords()
                    .then(result => {
                        this.items = result;
                        this.totalRecordCount = result.length;
                        this.totalPage = Math.ceil(this.totalRecordCount / this.pageSize);
                        this.updateData();
                    })
                    .catch(error => {
                        console.log('Error in fetching all records:', error);
                    });
            }
        }


}
