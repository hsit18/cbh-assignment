# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here


### Ticket 1: Add a customId field to the Agents table
**Description**
		Add a new field customId to the Agents table to allow Facilities to save custom Id based on agent.

**Acceptance Criteria**

 1. Add new field custom_id to agents table
 2. It should be unique and required field for agent record
 3. Agent should be identified with custom_id
 4. custom_id should be visible In agent list view page.
 5. Facilities can edit the custom_id field in agent edit page
 6. Agent shift must be identified by agent custom_id

**Time estimate**: 3 days

**Implementation Details**
 1. Add a migration script to create the custom_id field in the Agents table
 2. Add an indexes to the custom_id field
 3. Update the Shifts table to use the agent custom_id field to associate Agents with Shifts

### Ticket 2: Update getShiftsByFacility function to use Agent customId

**Description**
	Update the getShiftsByFacility function to use Agent customId instead of internal database id.
	
**Acceptance Criteria**
 1. The Agent metadata returned by the function includes the custom Agent id instead of the internal database id
 
**Time estimate** 2 days

**Implementation Details**

1. Modify getShiftsByFacility function, use Agent customId to retrieve Agent metadata from the Agents table
2. Update the SQL query to join the Agents table on the Shifts table using the Agent customId
3. Update the agent metadata value to include the Agent customId instead of the internal database id

### Ticket 3: Update Compliance Report to use Agent customId

**Description**
		Update compliance report to include Agent customId instead of internal database id

**Acceptance Criteria**

1. Agent customId should be displayed on the report.

**Time estimate**: 2 days

**Implementation Details**

1. Modify the generateReport function, use Agent customId to retrieve Agent metadata from the Agents table
2. Update the report template to use the Agent customId instead of the internal database id