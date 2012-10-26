Math.interpolate = function(lo, hi, val) 
{ 
        var denominator = (hi-lo); 
        if (denominator == 0) 
        { 
                return 0; 
        } 
        return (val-lo) / denominator; 
};

