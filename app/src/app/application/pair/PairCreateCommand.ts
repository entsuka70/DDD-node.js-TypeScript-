import express from 'express';

export default class PairCreateCommand {
    public id: string
    public team_id: string
    public pair_name: string
    public user_ids: string[]

    constructor(req: express.Request) {
        this.id = req.params.id
        this.team_id = req.body.team_id;
        this.pair_name = req.body.pair_name;
        this.user_ids = req.body.user_ids
    }

    public getId() {
        return this.id;
    }

    public getTeamId() {
        return this.team_id;
    }

    public getPairName() {
        return this.pair_name;
    }

    public getUserIds() {
        return this.user_ids;
    }
}