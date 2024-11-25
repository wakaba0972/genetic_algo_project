class generation{
    constructor(id, population_size){
        this.id = id;
        this.isEnd = true;
        this.population_size = population_size;
        this.population = new Array(this.population_size);
        this.total_fitness = 0;
        this.highest_fitness = 0
        this.timer = null;

        this.tb = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
        }

        for(let i = 0; i < population_size; ++i){
            this.population[i] = new cromosome();
        }
    }

    rand_generation(){
        for(let i = 0; i < population_size; ++i){
            this.population[i].rand_gen_data();
        }
    }

    next_generation(){
        let corssover_size = Math.floor(this.population_size * CROSSOVER_RATE);
        let elitism_size = this.population_size - corssover_size;
        
        this.population.sort(function(p1, p2){
            if(p1.fitness < p2.fitness) return 1 
            else return -1;
        })

        let roullte = new Array();
        for(let i = 0; i < this.population_size; ++i){
            for(let j=0; j<this.population[i].fitness; ++j) roullte.push(i)
        }

        let new_generation = new generation(this.id+1, this.population_size);
        for(let i = 0; i < corssover_size; ++i){
            let idx1 = roullte[Math.floor(Math.random() * roullte.length)];
            let idx2 = idx1;
            while(idx1 == idx2){
                idx2 = roullte[Math.floor(Math.random() * roullte.length)];
            }

            new_generation.population[i] = crossover(this.population[idx1], this.population[idx2]);
        }

        for(let i=0; i<elitism_size; ++i){
            this.population[i].mutate(0.001);
            new_generation.population[corssover_size + i] = this.population[i];
        }

        return new_generation;
    }

    calculate() { return new Promise((resolve, reject) => {
        this.isEnd = false;
        let cnt = 0;
        let end_cnt = 0; //已結束運算的染色體數量

        if(!FAST) {
            this.timer = setInterval(() => {
                // 終止條件
                if(end_cnt >= this.population_size) {
                    clearInterval(this.timer);
                    this.isEnd = true;
                    return resolve(this.next_generation());
                }

                // 當有空閒game時，將一個染色體放入game中
                if(cnt < this.population_size && !idle_games.isEmpty()){
                    let idx = idle_games.dequeue();
                    games[idx].init(cnt);
                    games[idx].input_object(object_balls_properties);
                    games[idx].input_cue(this.population[cnt].data());
                    ++cnt;
                }

                // update
                for (let i = 0; i < number_of_games; ++i){
                    if(!games[i].isEnd && games[i].check_isEnd()) {
                        this.population[games[i].id].fitness = games[i].fitness();
                        this.total_fitness += this.population[games[i].id].fitness;
                        this.tb[games[i].inball]++;

                        idle_games.enqueue(i);
                        ++end_cnt;
                        //console.log(end_cnt);
                        continue;
                    }
                    games[i].update();
                }
            }, 0.001);
        }
        else {
            while(1) {
                // 終止條件
                if(end_cnt >= this.population_size) {
                    clearInterval(this.timer);
                    this.isEnd = true;
                    return resolve(this.next_generation());
                }

                // 當有空閒game時，將一個染色體放入game中
                if(cnt < this.population_size && !idle_games.isEmpty()){
                    let idx = idle_games.dequeue();
                    games[idx].init(cnt);
                    games[idx].input_object(object_balls_properties);
                    games[idx].input_cue(this.population[cnt].data());
                    ++cnt;
                }

                // update
                for (let i = 0; i < number_of_games; ++i){
                    if(!games[i].isEnd && games[i].check_isEnd()) {
                        this.population[games[i].id].fitness = games[i].fitness();
                        this.total_fitness += this.population[games[i].id].fitness;
                        this.tb[games[i].inball]++;

                        idle_games.enqueue(i);
                        ++end_cnt;
                        //console.log(end_cnt);
                        continue;
                    }
                    games[i].update();
                }
            };
        }
    });}
}