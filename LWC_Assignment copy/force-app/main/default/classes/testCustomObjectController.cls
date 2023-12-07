
@isTest
private class testCustomObjectController {

    @isTest
    static void testCreateCompany() {
        Map<String, Object> recordData = new Map<String, Object>{
            'Name' => 'Test Company',
            'Email__c' => 'test@example.com'
        };

        Test.startTest();
        List<Company__c> createdCompanies = CustomObjectController.createCompany(recordData);
        Test.stopTest();

        System.assertEquals(1, createdCompanies.size());
        Company__c createdCompany = createdCompanies[0];
        System.assertNotEquals(null, createdCompany.Id);
    }

    @isTest
    static void testUpdateRecord() {
        Company__c testCompany = new Company__c(Name='Test Company');
        insert testCompany;

        Map<String, Object> updatedData = new Map<String, Object>{
            'Name' => 'Updated Test Company'
        };

        Test.startTest();
        List<Company__c> updatedCompanies = CustomObjectController.updateRecord(testCompany.Id, updatedData);
        Test.stopTest();

        System.assertEquals(1, updatedCompanies.size());
        Company__c updatedCompany = updatedCompanies[0];
        System.assertEquals('Updated Test Company', updatedCompany.Name);
    }

    @isTest
    static void testDeleteCompany() {
        Company__c testCompany = new Company__c(Name='Test Company');
        insert testCompany;

        Test.startTest();
        CustomObjectController.deleteCompany(testCompany.Id);
        Test.stopTest();

        List<Company__c> deletedCompanies = [SELECT Id FROM Company__c WHERE Id = :testCompany.Id];
        System.assertEquals(0, deletedCompanies.size());
    }

    @isTest
    static void testFetchRecords() {
        List<Company__c> testCompanies = new List<Company__c>{
            new Company__c(Name='Test Company 1'),
            new Company__c(Name='Test Company 2'),
            new Company__c(Name='Test Company 3')
        };
        insert testCompanies;

        Test.startTest();
        List<Company__c> result = CustomObjectController.fetchRecords();
        Test.stopTest();

        System.assertEquals(3, result.size());
    }

    @isTest
    static void testSearchCompanies() {

        List<Company__c> testCompanies = new List<Company__c>{
            new Company__c(Name='Test Company 1'),
            new Company__c(Name='Test Company 2'),
            new Company__c(Name='Another Company')
        };
        insert testCompanies;

        Test.startTest();
        List<Company__c> result = CustomObjectController.searchCompanies('Test');
        Test.stopTest();
        System.assertEquals(2, result.size());
    }
}